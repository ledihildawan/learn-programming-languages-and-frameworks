function upperCaseFirst(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function upperCaseWords(sentence) {
  var words = sentence.split(' ');
  for (var i = 0; i < words.length; i++) {
    words[i] = upperCaseFirst(words[i])
  }
  return words.join(' ');
}

upperCaseWords('lowercase words');