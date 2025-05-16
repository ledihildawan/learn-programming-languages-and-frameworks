'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on('end', (_) => {
  inputString = inputString
    .trim()
    .split('\n')
    .map((str) => str.trim());

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function isNumber(value) {
  return typeof value === 'number';
}

function isPositiveNumber(value) {
  return value > 0;
}

function calculateInvestmentReturn(initialFund, profitPerYear, yearsOfWithdrawal) {
  if (
    !isNumber(initialFund) ||
    !isNumber(profitPerYear) ||
    !isNumber(yearsOfWithdrawal) ||
    !isPositiveNumber(initialFund) ||
    !isPositiveNumber(profitPerYear) ||
    !isPositiveNumber(yearsOfWithdrawal) ||
    initialFund < 1e3 ||
    initialFund > 1e9 ||
    profitPerYear < 1 ||
    profitPerYear > 20 ||
    yearsOfWithdrawal > 40
  ) {
    return 'Wrong Input';
  }

  let totalAmount = initialFund;

  for (let i = 1; i <= yearsOfWithdrawal; i++) {
    totalAmount += (totalAmount * profitPerYear) / 100;
  }

  return `Rp ${Math.floor(totalAmount)}`;
}

function log(initialFund, profitPerYear, yearsOfWithdrawal) {
  console.log(calculateInvestmentReturn(initialFund, profitPerYear, yearsOfWithdrawal));
}

function main() {
  //DO YOUR CODE HERE
  const input1 = readLine();
  const input2 = readLine();
  const input3 = readLine();

  log(+input1, +input2, +input3);
}
