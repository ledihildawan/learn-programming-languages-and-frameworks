const fs = require('fs');

fs.writeFile('message.txt', 'Hello, Node.js', () => {
  console.log('Saved.');
});

console.log('Writing file...');

fs.readFile('message.txt', { encoding: 'utf-8' }, (err, data) => {
  console.log(data);
});
