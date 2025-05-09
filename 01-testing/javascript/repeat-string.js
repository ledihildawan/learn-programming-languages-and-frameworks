function repeatString(str, times) {
  const placeholders = Array.from({ length: times }, (_, i) => i);

  return placeholders.reduce((acc) => acc + str, "");
}

console.log(repeatString("car", 4));
