class State<T> {
  #state: T[];

  get state(): T[] {
    return this.#state;
  }

  constructor(state: T[]) {
    this.#state = state;
  }

  removeFirstElement(): T[] {
    this.#state = this.#state.slice(1);

    return this.#state;
  }

  removeElement(item: T): T[] {
    this.#state = this.#state.filter((el) => el !== item);

    return this.#state;
  }

  addToFirstElement(item: T): T[] {
    this.#state = [item, ...this.#state];

    return this.#state;
  }

  addToLastElement(item: T): T[] {
    this.#state = [...this.#state, item];

    return this.#state;
  }

  clearArray(): T[] {
    this.#state = [];

    return this.#state;
  }

  resetInitialState(initialState: T[]): T[] {
    this.#state = initialState;

    return this.#state;
  }

  replaceAll(item: T, newItem: T): T[] {
    this.#state = this.#state.map((el) => (el === item ? newItem : el));

    return this.#state;
  }

  addToindex(index: number, item: T): T[] {
    this.#state = [
      ...this.#state.slice(0, index),
      item,
      ...this.#state.slice(index),
    ];

    return this.#state;
  }
}

const initialState = [1, 2, 3, 4, 5];

const numbers = new State<number>(initialState);

numbers.removeFirstElement();
numbers.removeElement(2);
numbers.addToFirstElement(1);
numbers.addToLastElement(6);
numbers.clearArray();
numbers.resetInitialState(initialState);
numbers.replaceAll(1, 10);
numbers.addToindex(2, 20);

console.log(numbers.state);
