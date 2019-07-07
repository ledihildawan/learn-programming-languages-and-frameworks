// Destructuring Array
const newArr = ["hi", "ledi", "newItem", "spreadftw"];
// const a = newArr[0];
// const b = newArr[1];

// Spread operator
const [a, b, ...c] = newArr;

// Destructuring Object
const makePerson = ({ firstName, lastName, age, job }) => {
  return {
    firstName,
    lastName,
    age,
    job,
  }
};

const hireDev = ({ dev }) => {
  console.log(dev)
  const hiredDev = {
    hired: true,
    ...dev
  };
  return hiredDev;
};

const ledi = makePerson({
  firstName: "ledi",
  lastName: "hildawan",
  age: 22,
  job: "web dev"
});

const lediGetAJob = hireDev({ledi});

console.log(lediGetAJob);

// Naming things best practice
// Consistency is King
// Clear, serachable & obvious
// Const variables uppercase syntex common
// Var names that make sense

// Pure function
// Always return same thing
// Immutable vs Mutable
// Can't be changed vs can be changed
// Isn't change vs changed