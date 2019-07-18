import Console from 'apr-engine-console';

export default (fn, ...args) => {
  return Console('dir', fn, ...args);
};
