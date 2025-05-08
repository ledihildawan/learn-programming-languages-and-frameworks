const me: any = 'Stefan';
const myName: string = me;
const age: number = me;

function doSomething(value: unknown) {
  if (typeof value === 'string') {
    console.log("It's a string", value.toUpperCase())
  } else if (typeof value === 'number') {
    console.log("It's a number", value * 2);
  }
}
