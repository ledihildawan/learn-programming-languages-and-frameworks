let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Done'), 1500);
});

promise.then(value => console.log(value));