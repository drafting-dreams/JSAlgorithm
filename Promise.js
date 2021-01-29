// Promise is just a state machine

class Promise {
  constructor(fn) {
    this.state = 0; // 0: pending, 1: resolved, 2: rejected
    this.value = null;
    this.handlers = [];
    doResolve(fn, this.resolve, this.reject);
  }

  fulfill(result) {
    this.state = 1;
    this.value = result;
    this.handlers.forEach(this.handle);
    this.handlers = [];
  }
  reject(reason) {
    this.state = 2;
    this.value = reason;
    this.handlers.forEach(this.handle);
    this.handlers = [];
  }

  resolve(result) {
    try {
      const then = getThen(result);
      if (then) {
        doResolve(then.bind(result), this.resolve, this.reject);
      } else {
        this.fulfill(result);
      }
    } catch (ex) {
      this.reject(ex);
    }
  }

  handle(handler) {
    if (this.state === 0) {
      this.handlers.push(handler);
    } else if (this.state === 1 && typeof handler.onFulfilled === "function") {
      handler.onFulfilled(this.value);
    } else if (this.state === 2 && typeof handler.onRejected === "function") {
      handler.onRejected(this.value);
    }
  }

  done(onFulfilled, onRejected) {
    const self = this;
    setTimeout(() => {
      self.handle({ onFulfilled, onRejected });
    }, 0);
  }

  then(onFulfilled, onRejected) {
    const self = this;
    return new Promise(function (res, rej) {
      self.done(
        function (result) {
          if (typeof onFulfilled === "function") {
            try {
              return res(onFulfilled(result));
            } catch (ex) {
              return rej(ex);
            }
          } else {
            return resolve(result);
          }
        },
        function (error) {
          if (typeof onRejected === "function") {
            try {
              return res(onRejected(error));
            } catch (ex) {
              return rej(ex);
            }
          } else {
            return rej(error);
          }
        }
      );
    });
  }
}

function getThen(value) {
  if (value instanceof Object && typeof value.then === "function")
    return value.then;
  return null;
}
/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 */
function doResolve(fn, onFulfilled, onRejected) {
  let done = false;
  try {
    fn(
      (value) => {
        if (done) return;
        done = true;
        onFulfilled(value);
      },
      (reason) => {
        if (done) return;
        done = true;
        onRejected(reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    onRejected(ex);
  }
}
