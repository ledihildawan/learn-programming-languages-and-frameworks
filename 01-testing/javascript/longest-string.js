function longestString(words) {
  const filteredWords = words.replace(/\W/g, ' ');

  return filteredWords
    .split(' ')
    .reduce((acc, item) => (acc.length > item.length ? acc : item));
}

console.log(longestString('How do you feel?'));
