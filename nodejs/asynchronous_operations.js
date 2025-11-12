const dns = require('node:dns');

function doSomething(asyncCallback) {
  asyncCallback();
}
doSomething(() => {
  console.log('This runs synchronously.');
});

function doSomethingAsync(asyncCallback) {
  setTimeout(asyncCallback, Math.random() + 1000);
}
doSomethingAsync(() => {
  console.log('This runs asynchronously.');
});

dns.lookup('bing.com', (err, address, family) => {
  console.log('Address: %j, Family: IPv%s, Error: %s', address, family, err);
});
