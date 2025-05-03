const me: any = 'Stefan';
const name: string = me;
const age: number = me;

console.log(namex.profession.experience[0].level);

function doSomething(value: unknown) {
  if (typeof value === 'string') {
    console.log("It's a string", value.toUpperCase);
  } else if (typeof value === 'number') {
    console.log("It's a number", value * 2);
  }
}
