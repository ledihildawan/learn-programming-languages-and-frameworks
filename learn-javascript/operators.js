let x = 10;
let y = 3;

// Arithmetic operators
console.log(x + y);
console.log(x - y);
console.log(x * y);
console.log(x / y);
console.log(x % y);
console.log(x ** y);

// Increment
console.log(++x);
console.log(x++);

// Decrement
console.log(--x);
console.log(x--);

// Asignment operator
x += 5;
x -= 2;
x *= 3;
x /= 2;
x %= 2;
console.log(x **= 2);

// Comparison Operator
console.log(x < y);
console.log(x <= y);
console.log(x > y);
console.log(x >= y);
// Lose Equality
console.log(x == y);
console.log(x != y);
// Strict (Type + Value)
console.log(x === y);
console.log(x !== y);

// Ternary Operator
let customerPoints = 100;
let customerType = customerPoints > 100 ? 'gold customer' : 'silver customer';

console.log(customerType);

// Logical Operators
// AND (&&) returns TRUE if both operands are TRUE
// OR (||) returns TRUE if one of the operands is TRUE
// NOT (!)
let highIncome = false;
let goodCreditScore = false;
let eligibleForLoan = highIncome && goodCreditScore;
let applicationRefused = !eligibleForLoan;

console.log(eligibleForLoan);

//  Falsy (false)
// undefined
// null
// 0
// false
// ''
// NaN

// Anything that is not Falsy -> Truthy

// Short-circuiting
let userColor = undefined;
let defaultColor = 'blue';
let currentColor = userColor || defaultColor;

console.log(currentColor);

// BitWise operators
// 1 = 00000001
// 2 = 00000010
// 3 = 00000011
// R = 00000000
console.log(1 | 2); // BitWise OR
console.log(1 & 2); // BitWise AND

// Read, Write, Execute
// 00000100
// 00000010
// 00000001

const readPermission = 4;
const writePermission = 2;
const executePermission = 1;

let myPermission = 0;
myPermission = myPermission | readPermission | writePermission;

let message = (myPermission & readPermission) ? 'Yes' : 'No';

console.log(message);