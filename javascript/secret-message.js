let secretMessage = [
  'Learning', 'is', 'not', 'about', 'what', 'you', 'can', 'easily', 'get', 'right', 'the', 'first', 'time,', 'it', 'is', 'about', 'what', 'you', 'can', 'figure', 'out'
];

secretMessage.pop();

console.log(secretMessage.length);

secretMessage.push('to', 'Program');

secretMessage[secretMessage.indexOf('easily')] = 'right';

secretMessage.shift();

secretMessage.unshift('Programming');

let start = secretMessage.indexOf('get');
let end = secretMessage.indexOf('time,') + 1;
secretMessage.splice(start, end - start, 'know,');

console.log(secretMessage.join(' '));
