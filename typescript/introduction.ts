type State =
  | { type: 'loading' }
  | { type: 'success'; value: number }
  | { type: 'error'; message: string };

declare const state: State;

if (state.type === 'success') {
  console.log(state.value);
} else if (state.type === 'error') {
  console.error(state.message);
}

type OrderSize = 'regular' | 'large';
type OrderItem = 'Espresso' | 'Cappuccino';
type Order = `A ${OrderSize} ${OrderItem}`;

let order1: Order = 'A regular Cappuccino';
let order2: Order = 'A large Espresso';

// Type Assertion

interface Foo {
  bar: number;
  baz: string;
  readonly fizz?: string;
}

let foo = {
  fizz: 'test',
} as Foo;
foo.bar = 123;
foo.baz = 'hello world';
foo.fizz;

let numbers: Array<number> = [0, 1, 2, 3, 4];
let moreNumbers: ReadonlyArray<number> = numbers;

// Generics
// Classes
class Tuple<T1, T2> {
  constructor(public item1: T1, public item2: T2) {}
}

// Interfaces
interface Pair<T> {
  item1: T;
  item2: T;
}

// And functions
let pairToTuple = function <T>(p: Pair<T>) {
  return new Tuple(p.item1, p.item2);
};

let tuple = pairToTuple({ item1: 'hello', item2: 'world' });
