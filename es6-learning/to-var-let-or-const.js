// function fire(bool) {
//   var foo;

//   if (bool) {
//     foo = 'bar';

//     console.log(foo); // bar
//   } else {
//     console.log(foo); // undefined
//   }
// }

// function fire(bool) {
//   if (bool) {
//     let foo = 'bar';

//     console.log(foo); // bar
//   } else {
//     console.log(foo); // ReferenceError: foo is not defined
//   }
// }

// fire(false);

const names = ['John', 'Sandy'];
// names = ['Frank', 'Susan'];  // TypeError: Assignment to constant variable.
names.push('Susan'); // [ 'John', 'Sandy', 'Susan' ]

// Default to using const
// let if you need reassignment
// never use var again

const months = Object.freeze(['January', 'February']);
months.push('test'); // TypeError: Cannot add property 2, object is not extensible
