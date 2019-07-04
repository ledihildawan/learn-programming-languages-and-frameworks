var button = document.querySelector('button');

console.log('Before');

button.onclick = function () {
  alert('I was clicked.');
};

console.log('After');

// var promise = this.$http.get('/some/path');

// promise.then(data => {

// }).catch(err => {

// });

var timer = function(length) {
  return new Promise((resolve, reject) => {
    console.log('Init promise');
    setTimeout(() => {
      console.log('Timeout done.');
      resolve();
    }, length);
  });
};

timer(4000).then(() => {
  console.log('Proceed now that timer has concluded.');
});