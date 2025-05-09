const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
const itemTracker = ['item 0', 'item 1', 'item 2'];
const famousSayings = ['Fortune favors the brave.', 'A joke is a very serious thing.', 'Where there is love there is life.'];
const newYearsResolutions = ['Keep a journal', 'Take a falconry class', 'Learn to juggle'];

const listItem = famousSayings[0];

console.log(listItem);

seasons[3] = 'Autumn';

console.log(seasons);
console.log(newYearsResolutions.length);

itemTracker.push('item 3', 'item 4');

console.log(itemTracker);

const newItemTracker = ['item 0', 'item 1', 'item 2'];

const removed = newItemTracker.pop();

console.log(newItemTracker);

console.log(removed);

const groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', 'coconut oil', 'plantains'];

groceryList.shift();

console.log(groceryList);

groceryList.unshift('popcorn');

console.log(groceryList);

console.log(groceryList.slice(1, 4));

console.log(groceryList);

const pastaIndex = groceryList.indexOf('pasta');

console.log(pastaIndex);

const concept = ['arrays', 'can', 'be', 'mutated'];

function changeArr(arr: string[]) {
  arr[3] = 'MUTATED';
}

changeArr(concept);

console.log(concept);

function removeElement(newArr: string[]) {
  newArr.pop();
}

removeElement(concept);

console.log(concept);

const numberClusters = [[1, 2], [3, 4], [5, 6]];

const target = numberClusters[2][1];

console.log(target);
