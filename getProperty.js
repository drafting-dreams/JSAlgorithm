function f ( obj, ...queryStrings ) {
  const queries = [...queryStrings];
  const results = [];
  for (let query of queries) {
    const temp = query.split('.');
    let result = obj;
    while(temp.length>0) {
      const current = temp.shift();
      result = getPropertyOf(result, current);
    }
    results.push(result);
  }
  return results;
}

function getPropertyOf (obj, query) {
  if(!query.includes(']')) {
    return obj[query];
  }
  const reg = /(\w+)\[(\d+)]/;
  const re = reg.exec(query);
  return obj[re[1]][re[2]];
}

const obj1 = {
  selector: {
    1: "toutiao",
    next: {
      inner: "what?"
    }
  },
  target: [3, 4, {last: "not yet"}],
};
//getPropertyOf(obj1, "target[1]");
console.log(f(obj1, "selector.next.inner", "selector[1]", "target[1]", "target[2].last"));
