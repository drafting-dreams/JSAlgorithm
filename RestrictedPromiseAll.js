/**
 *  @param requests {Function[]} The return value of each function is a Promise
 *  @param maxConcurrent {number}
 *  @return {Promise}
 */
function myPromiseAll(requests, maxConcurrent = 5) {
  const n = requests.length;

  if (maxConcurrent >= n) {
    return Promise.all(requests.map((req) => req()));
  }

  return new Promise((resolve, reject) => {
    let pushProgress = 0;
    let doneProgress = 0;
    let broke = false;

    const re = new Array(n);

    function next(index) {
      requests[index]()
        .then(
          (value) => {
            if (broke) return;
            re[index] = value;
            if (pushProgress < n) {
              next(pushProgress++);
            }
            if (++doneProgress === n) {
              resolve(re);
            }
          },
          (err) => {
            reject(err);
            broke = true;
          }
        )
        .catch((ex) => {
          reject(ex);
          broke = true;
        });
    }

    for (; pushProgress < maxConcurrent; pushProgress++) {
      next(pushProgress);
    }
  });
}

// Test
function req() {
  return new Promise((resolve) => {
    console.log("Enque time", new Date().getTime() / 1000);
    setTimeout(() => {
      resolve(`The time is: , ${new Date().getTime() / 1000}`);
    }, 2000);
  });
}

myPromiseAll([req, req, req, req, req, req, req, req], 3).then((value) => {
  console.log(value);
});
