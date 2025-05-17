// function clamp(value: number, lower: number, upper: number) {
//   if (value > upper) return upper;
//   if (value < lower) return lower;
//   return value;
// }

function clamp(value: number, upper: number, lower: number): number {
  return Math.max(lower, Math.min(upper, value));
}

console.log(clamp(10, -5, 5));
