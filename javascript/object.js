// Every JavaScript object has a prototype property, which makes inheritance possible in JavaScript.
// The prototype property of an object is where we put methods and properties that we want other objects to inherit.

const john = {
  firstName: 'john',
  lastName: 'smith',
  yearOfBirth: 1990,
  job: 'teacher',
  isMarried: false,
  family: ['jane', 'mark', 'bob'],
  calculateAge() {
    return 2019 - this.yearOfBirth;
  }
};

console.log(john.lastName);
console.log(john['lastName']);
var xyz = 'job';
console.log(john[xyz]);
console.log(john);  
console.log(john.calculateAge());

const jane = new Object();
jane.name = 'Jane';
jane.lastName = 'Smith';
jane['yearOfBirth'] = 1969;
jane['job'] = 'retired';
jane['isMerried'] = true;
console.log(jane);

// const myAccount = {
//   name: "Ledi Hildawan",
//   expenses: 0,
//   income: 0
// };

// const resetAccount = function(account) {
//   account.expenses = 0;
//   account.income = 0;
// };

// const addIncome = function(account, amount) {
//   if (account.income > 0) {
//     account.income += amount; 
//   } else {
//     account.income = amount;
//   }
// };

// const addExpenses = function(account, amount) {
//   if (account.expenses > 0) {
//     account.expenses += amount;
//   } else {
//     account.expenses = amount;
//   }
// };

// const getAccountSummary = function(account) {
//   const name = account.name;
//   const balance = account.income - account.expenses;
//   const expenses = account.expenses;
//   const income = account.income;

//   return `Account for ${name} has Rp. ${balance}. Rp. ${income} in income. Rp. ${expenses} in expenses`;
// };

// addIncome(myAccount, 500000);
// addExpenses(myAccount, 140000);
// addExpenses(myAccount, 280000);
// getAccountSummary(myAccount);
// resetAccount(myAccount);


// const restaurant = {
//   name: "JS",
//   guestCapacity: 40,
//   guestCount: 0,
//   checkAvailability: function (partySize) {
//     const seatsLeft = this.guestCapacity - this.guestCapacity;
//     return partySize <= seatsLeft;
//   },
//   seatParty: function (partySize) {
//     this.guestCount += partySize;
//   },
//   removeParty: function (partySize) {
//     this.guestCount -= partySize;
//   }
// }

// const randomNum = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const makeGuess = function(guess) {
//   const answer = randomNum(1, 5);
//   return guess === answer;
// }

// console.log(makeGuess(2));
// console.log(makeGuess(1));

// const removeTodo = function (todos, title) {
//   const index = todos.findIndex(function (todo) {
//     return todo.title.toLowerCase() === title.toLowerCase();
//   });

//   if (index > -1) {
//     todos.splice(index, 1);
//   }
// };

// const myAccount = {
//   name: "Ledi Hildawan",
//   expenses: [],
//   income: [],
//   addExpenses: function (description, amount) {
//     this.expenses.push({
//       description: description,
//       amount: amount
//     });
//   },
//   addIncome: function(description, amount) {
//     this.income.push({
//       description: description,
//       amount: amount
//     });
//   },
//   getAccountSummary: function () {
//     let totalExpenses = 0;
//     let totalIncome = 0;
//     let accountBalance;

//     this.expenses.forEach(function (expense) {
//       totalExpenses += expense.amount;
//     });

//     this.income.forEach(function (income) {
//       totalIncome += income.amount;
//     });

//     accountBalance = totalIncome - totalExpenses;

//     return `${this.name} has Rp. ${balance}. Rp. ${totalExpenses} in expenses. Rp. ${totalIncome} in income.`;
//   }
// };

// myAccount.addExpenses("SSID 128GB", 450000);
// myAccount.addExpenses("NETFLIX 1 Month", 160000);
// myAccount.addIncome("Sale Template", 750000);
// myAccount.addIncome("Sponsor", 2500000);

// console.log(myAccount.getAccountSummary());

//  uuid
// moment

// Factory function
// function createCircle(redius) {
//   return {
//     radius,
//     draw() {
//       console.log('draw');
//     }
//   }
// }

// const myCircle = createCircle(1);

// Constructor function
// function Circle(radius) {
//   this.radius = radius;
//   thid.draw = function () {
//     console.log('draw');
//   }
// }

// const circle = new Circle(10);