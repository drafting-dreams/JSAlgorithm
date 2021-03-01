function promiseAll(promises) {
  const n = promises.length;
  const results = new Array(n);
  let fulfilledCount = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, i) => {
      promise
        .then((result) => {
          results[i] = result;
          fulfilledCount++;
          if (fulfilledCount === n) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    });
  });
}

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;
// Promise is a state machine.
// The function fn we passed to it, is called resolver, it can fetch the result asynchronously.
// But this fn is not trusted, it is allowed to call both resolve and reject multi times.
// the then method of Promise is like a event register, it accepts fulfillHandler and rejectHandler
class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.result = null;
    this.handlers = [];
    doResolve(fn, this._resolve, this._reject);
  }

  _fulfill(value) {
    this.state = FULFILLED;
    this.result = value;
    this.handlers.forEach(this._handle);
  }
  s;

  _reject(err) {
    this.state = REJECTED;
    this.result = err;
    this.handlers.forEach(this._handle);
  }

  _resolve(value) {
    try {
      // Check if the value is a Promise, if it is a Promise, we can't fulfill it directly.
      const then = getThen(value);
      if (then) {
        this._doResolve(then.bind(value), this._resolve, this._reject);
        return;
      }
      this._fulfill(value);
    } catch (err) {}
  }

  _handle(handler) {
    if (
      this.state === FULFILLED &&
      typeof handler.fulfillHandler === "function"
    ) {
      handler.fulfillHandler(this.result);
    } else if (
      this.state === REJECTED &&
      typeof handler.rejectHandler === "function"
    ) {
      handler.rejectHandler(this.result);
    } else {
      this.handlers.push(handler);
    }
  }

  // When implementing then method, what should be confirmed first is the props and the return value
  // The return value is also a Promise
  // And then is a register for doneHandlers, which means it passes in two functions fulfillHandler and rejectHandler
  // What's more the handlers passed to then are micro tasks, _done method assures that
  then(fulfillHandler, rejectHandler) {
    // resolve and reject here below are functions that injected by promise machine, see in the constructor
    return Promise((resolve, reject) => {
      this._done(
        (value) => {
          if (typeof fulfillHandler === "function") {
            try {
              // Here's the key thing, fulfillHandler could return either a value or a Promise,
              // if it is a promise, we notice that we did distinguish promise and value in _resolve method
              resolve(fulfillHandler(value));
            } catch (err) {
              reject(err);
            }
          } else {
            resolve(value);
          }
        },
        (error) => {
          if (typeof rejectHandler === "function") {
            try {
              resolve(rejectHandler(error));
            } catch (err) {
              reject(err);
            }
          } else {
            reject(error);
          }
        }
      );
    });
  }

  // On https://www.promisejs.org/implementing/, method below was using setTimeout instead of queueMicrotask,
  // But what promises resolve really perform is like a microtask,
  // I guess the reason why they were using setTiemout is that queueMicrotask isn't open for third party on some browsers
  _done(onFulfilled, onRejected) {
    queueMicrotask(() => {
      this._handle({
        fulfillHandler: onFulfilled,
        rejectHandler: onRejected,
      });
    });
  }
}

function getThen(obj) {
  if (typeof obj === "object" && typeof obj.then === "function") {
    return obj.then;
  }
  return null;
}

// The fn function is the function we usually passed to the Promise constructor
// This fn is not trusted, user might call onFulfilled or onRejected multitimes,
// our doResolve is mainly responsible for the robust
function doResolve(fn, onFulfilled, onRejected) {
  let done = false;
  const wrapOnFulfilled = (value) => {
    if (done) return;
    done = true;
    onFulfilled(value);
  };
  const wrapOnRejected = (err) => {
    if (done) return;
    done = true;
    onRejected(err);
  };
  try {
    fn(wrapOnFulfilled, wrapOnRejected);
  } catch (err) {
    if (done) return;
    done = true;
    onRejected(err);
  }
}
