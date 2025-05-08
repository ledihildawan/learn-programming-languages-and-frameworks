function fn(input: number): number;
function fn(input: string): string;
function fn(input: number | string): number | string {
  if (typeof input === 'string') {
    return 'this also works';
  } else {
    return 1337;
  }
}

const typeSaysNumberButItsAString = fn(12);
const typeSaysNumberButItsANumber = fn('Hello World');

type CallbackFn = () => void;

type TaskFn = {
  (name: string, dependencies: string[]): void;
  (name: string, callback: CallbackFn): void;
  (name: string, dependencies: string[], callback: CallbackFn): void;
};

type Dice = 1 | 2 | 3 | 4 | 5 | 6;

function isDice(value: number): value is Dice {
  return value >= 1 && value <= 6;
}

isDice(10);
