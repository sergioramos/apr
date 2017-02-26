const apr = require('../package.json');
const forEach = require('../packages/for-each');
const parallel = require('../packages/parallel');
const awaitify = require('../packages/awaitify');
const isString = require('lodash.isString');
const documentation = require('documentation');
const readYaml = require('read-yaml');
const streamArray = require('stream-array');
const vfs = require('vinyl-fs');
const pump = require('pump');
const path = require('path');
const fs = require('fs');

const onFinish = awaitify(pump);
const build = awaitify(documentation.build);
const html = awaitify(documentation.formats.html);
const md = awaitify(documentation.formats.md);
const writeFile = awaitify(fs.writeFile);

const tocPath = path.join(__dirname, '../documentation.yml');
const toc = readYaml.sync(tocPath);
const packages = toc.toc.filter(isString);
const files = packages.map((pkg) => path.join(__dirname, `../packages/${pkg}/index.js`));

const options = {
  github: true
};

// const hljs = require('highlight.js');
// const Remarkable = require('remarkable');
// const Markdown = new Remarkable({
//   html: true,
//   breaks: true,
//   highlight: (str, lang) => {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return hljs.highlight(lang, str).value;
//       } catch (err) {}
//     }
//
//     try {
//       return hljs.highlightAuto(str).value;
//     } catch (err) {}
//
//     return '';
//   }
// });

const individual = async () => {
  return await forEach(packages, async (pkg) => {
    const dir = path.join(__dirname, `../packages/${pkg}`);

    const ast = await build([
      path.join(dir, 'index.js')
    ], {});

    const source = await md(ast, {});
    await writeFile(path.join(dir, 'readme.md'), source, {
      encoding: 'utf-8'
    });
  });
};

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

  return Object.keys(tree).reduce((toc, name) => {
    const parts = tree[name].map((name) => `* [${name}](#${name})`).join('\n  ').trim();

    toc += `
* [${name}](#${name})
  ${parts}
    `;

    return toc;
  }, `
<a id="contents"></a>
## contents

`);
};

const all = async () => {
  const ast = await build(files, Object.assign(options, {
    config: tocPath
  }));

  let source = await md(ast, {});
  const toc = await _toc();

  source = source.replace(/^## apr/, '# apr');
  source = source.replace(/<!-- \{\{TOC\}\} -->/, toc);

  await writeFile(path.join(__dirname, '../readme.md'), source, {
    encoding: 'utf-8'
  });
};

const website = async () => {
  const ast = await build(files, Object.assign(options, {
    config: tocPath
  }));

  const source = await html(ast, {
    name: apr.name
  });

  const _files = streamArray(source);
  const _dest = vfs.dest(path.join(__dirname, '../docs'));

  await onFinish(_files, _dest);
};

parallel({
  website,
  individual,
  all
}).then(
  () => console.log('Done'),
  (err) => { throw err; }
);
