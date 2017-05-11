const apr = require('../package.json');
const forEach = require('../packages/for-each');
const series = require('../packages/series');
const awaitify = require('../packages/awaitify');
const main = require('../packages/main');
const isString = require('lodash.isString');
const { build, formats } = require('documentation');
const readYaml = require('read-yaml');
const streamArray = require('stream-array');
const removeMd = require('remove-markdown');
const { writeFile } = require('mz/fs');
const vfs = require('vinyl-fs');
const remark = require('remark');
const union = require('lodash.union');
const pump = require('pump');
const path = require('path');

const onFinish = awaitify(pump);

const tocPath = path.join(__dirname, '../documentation.yml');
const toc = readYaml.sync(tocPath);
const packages = toc.toc.filter(isString);
const files = packages.map(pkg =>
  path.join(__dirname, `../packages/${pkg}/index.js`)
);

const options = {
  github: true
};

const individual = async () =>
  await forEach(packages, async name => {
    const dir = path.join(__dirname, `../packages/${name}`);
    const pkg = require(path.join(dir, 'package.json'));

    const ast = await build([path.join(dir, 'index.js')], {});

    const dsc = removeMd(remark().stringify(ast[0].description).split(/\n/)[1]);
    const readme = await formats.md(ast, {});

    const pjson = JSON.stringify(
      {
        name: `apr-${name}`,
        version: pkg.version,
        description: dsc,
        keywords: union((pkg.keywords || []).concat(name).concat(apr.keywords)),
        homepage: `https://apr.js.org#${name}`,
        bugs: apr.bugs,
        license: apr.license,
        people: pkg.people,
        author: apr.author,
        contributors: apr.contributors,
        files: pkg.files,
        main: 'src/index.js',
        bin: pkg.bin,
        man: pkg.man,
        directories: pkg.directories,
        repository: 'ramitos/apr',
        scripts: pkg.scripts,
        config: pkg.config,
        dependencies: pkg.dependencies,
        devDependencies: pkg.devDependencies,
        peerDependencies: pkg.peerDependencies,
        bundleDdependencies: pkg.bundleDdependencies,
        optionalDependencies: pkg.optionalDependencies,
        engines: pkg.engines,
        preferGlobal: pkg.preferGlobal,
        private: pkg['private'],
        publishConfig: pkg.publishConfig
      },
      null,
      2
    );

    await writeFile(path.join(dir, 'readme.md'), readme, {
      encoding: 'utf-8'
    });

    await writeFile(path.join(dir, 'package.json'), pjson, {
      encoding: 'utf-8'
    });
  });

const _toc = async () => {
  let last = '';

  const tree = toc.toc.reduce((tree, item) => {
    if (isString(item)) {
      return Object.assign(tree, {
        [last]: (tree[last] || []).concat([item])
      });
    }

    if (item.name === 'apr') {
      return tree;
    }

    last = item.name;

    return Object.assign(tree, {
      [item.name]: []
    });
  }, {});

  return Object.keys(tree).reduce(
    (toc, name) => {
      const parts = tree[name]
        .map(name => `* [${name}](#${name})`)
        .join('\n  ')
        .trim();

      toc += `
* [${name}](#${name})
  ${parts}
    `;

      return toc;
    },
    `
<a id="contents"></a>
## contents

`
  );
};

const all = async () => {
  const ast = await build(
    files,
    Object.assign(options, {
      config: tocPath
    })
  );

  let source = await formats.md(ast, {});
  const toc = await _toc();

  source = source.replace(/^## apr/, '# apr');
  source = source.replace(/<!-- \{\{TOC\}\} -->/, toc);

  await writeFile(path.join(__dirname, '../readme.md'), source, {
    encoding: 'utf-8'
  });
};

const website = async () => {
  const ast = await build(
    files,
    Object.assign(options, {
      config: tocPath
    })
  );

  const source = await formats.html(ast, {
    name: apr.name
  });

  const _files = streamArray(source);
  const _dest = vfs.dest(path.join(__dirname, '../docs'));

  await onFinish(_files, _dest);
};

main(
  series({
    website,
    individual,
    all
  })
);
