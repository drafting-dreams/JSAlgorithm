class EventHub {
  constructor() {
    this.listeners = new Set();
  }
  addEventListener(func) {
    if (typeof func === "function") {
      this.listeners.add(func);
    } else {
      throw Error("listener must be a function");
    }
  }
  removeEventListener(func) {
    if (this.listeners.has(func)) {
      this.listeners.delete(func);
    }
  }
  publish(e) {
    for (let listener of this.listeners) {
      listener(e);
    }
  }
}

const prototype = new EventHub();

function WhatEver() {
  return new Proxy(Object.create(prototype), {
    set: function (target, propKey, value) {
      Reflect.set(...arguments);
      target.publish({
        key: propKey,
        value,
      });
    },
  });
}

const what = new WhatEver();
function handler(e) {
  console.log(e);
}
what.addEventListener(handler);
what.a = 1;
what.addEventListener(() => {
  console.log("hello proxy");
});
what.b = 2;
