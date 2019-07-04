function countDown(seconds) {
  var intervalId = setInterval(function() {
    seconds--;
    if (seconds > 0) {
      console.log(seconds)
    } else {
      console.log('Ring Ring Ring!!!');
      clearInterval(intervalId);
    }
  }, 1000);
}

countDown(4);

setTimeout(() => {
  console.log('Hello from the timeout');
}, 0);

for (var i = 0; i < 100; i++) {
  var x = i * 2;
}

console.log(x);
console.log('Done with loop');