function cloneDeep(src) {
  const cache = new Map();
  function clone(src) {
    if (src instanceof Object) {
      if (cache.has(src)) {
        return cache.get(src);
      }
      let target;
      if (src instanceof Array) {
        target = src.map((item) => cloneDeep(item));
      } else if (src instanceof Function) {
        return src.bind({});
      } else {
        target = {};
        for (key in src) {
          if (src.hasOwnProperty(key)) {
            target[key] = cloneDeep(src[key]);
          }
        }
      }
      cache.set(src, target);
      return target;
    }
    return src;
  }
  return clone(src);
}
