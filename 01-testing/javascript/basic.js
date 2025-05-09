var variableName = 'Welcome to variables';

console.log(variableName);

// Remove duplicate characters in a string
[...new Set('ababccc')].join('');

function escapeForRegExp(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '\\$&');
}
