module.exports = (p) => new Promise((resolve) => p.then(
  (...res) => resolve([null, ...res]),
  (err) => resolve([err, undefined])
));
