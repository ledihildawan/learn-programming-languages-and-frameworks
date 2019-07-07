function logGreeting() {
  console.log(this);
}

const test = {
  testFunc: function () {
    console.log(this);
  },
  testFuncTwo: () => {
    console.log(this);
  },
  testFuncThree: function () {
    [1].map(() => {
      console.log(this);
    })
  },
  testFuncFour: function () {
    [1].map(logGreeting.bind(this));
  },
};

test.testFunc();
test.testFuncTwo();
test.testFuncThree();
test.testFuncFour();