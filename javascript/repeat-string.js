function repeatString(str, times) {
  const timesToArr = Array.from({ length: times }, (_, i) => i);

  return timesToArr.reduce((acc, item) => acc + str, '');
}

console.log(repeatString('car', 4));
