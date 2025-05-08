// let obj = {};
let obj: object;

obj = 32;
obj = 'Hello';
obj = true;
obj = () => {
  console.log('Hello');
};
obj = undefined;
obj = null;
obj = { name: 'Stefan', age: 40 };
obj = [];
obj = /.*/;

let okObj: {} = {
  toString() {
    return false;
  },
};

let obj: Object = {
  toString() {
    return false;
  },
};
