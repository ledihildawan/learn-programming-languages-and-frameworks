const arr: number[] = [];

function addItem(value) {
  arr.push(value);
}

function getItem() {
  return arr.shift();
}

arr.push(4, 5);
arr.unshift(1, 2, 3);

console.log(`arr has length: ${arr.length}`);

arr[3] = arr[3] * 10;

addItem(6);

console.log(getItem());

console.log(arr);
