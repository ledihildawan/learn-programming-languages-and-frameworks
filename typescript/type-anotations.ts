const guestCount: number = 50;
const favoriteDessert: string = 'Cheesecake';
const ingredients: string[] = [
  'butter',
  'flour',
  'baking powder',
  'sugar',
  'eggs',
  'vanilla',
  'salt',
];
const menu: {
  courses: number;
  veganOption: boolean;
  drinkChoices?: string[];
} = {
  courses: 5,
  veganOption: true,
};

function eatFruit(fruit: { name: string }): void {
  if (fruit.name === 'apple') {
    console.log('I love apples!');
  } else {
    console.log('Fruit is very tasty.');
  }
}

function transformFruit(
  fruitList: string[],
  transformFunction: (fruit: string) => string
): string[] {
  return fruitList.map(transformFruit);
}

const fruitList = ['Apple', 'Banana', 'Orange'];

function bakeFruit(fruitName: string): string {
  return `Baked ${fruitName}`;
}

const bakedFruit: string[] = transformFruit(fruit, bakeFruit);

async function getFruitList(): Promise<string[]> {
  const res = await fetch('https://example.com/fuits');
  const fruits: string[] = await res.json();

  return fruits;
}

function mapNumbersToNumbers(
  list: number[],
  callback: (item: number) => number
): number[] {
  return list.map(callback);
}

const doubledNumbers: number[] = mapNumbersToNumbers(
  [1, 2, 3],
  (num) => num * 2
);

function logOutput(message: string, yell = true): void {
  if (yell) {
    console.log(message.toUpperCase());
  } else {
    console.log(message);
  }
}

logOutput('Hey! Listen.');

function logManyOutput(...messages: string[]): void {
  messages.forEach((message: string) => {
    logOutput(message);
  });
}

logManyOutput('Hello', 'Hey!');
