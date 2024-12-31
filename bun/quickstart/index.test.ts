import { expect, test } from "bun:test";

import { produce } from "immer";

interface ITodo {
  id: string;
  title: string;
  done: boolean;
}

const toggleTodo = produce((draft: ITodo[], id: string) => {
  const todo = draft.find(todo => todo.id === id);

  todo.done = !todo.done
});

const baseState: ITodo[] = [
  {
    id: "JavaScript",
    title: "Learn TypeScript",
    done: true,
  },
  {
    id: "Immer",
    title: "Try Immer",
    done: false,
  }
];

let nextState = produce(baseState, (draftState) => {
  draftState.push({ id: "Tweet", title: "Tweet about it", done: false });
});

nextState = toggleTodo(nextState, "Immer");

test("base state is unmodified", () => {
  expect(baseState.length).toBe(2);
});

test("the new item only addded to the next state", () => {
  expect(nextState.length).toBe(3);
});

test("data index 1 udpated", () => {
  expect(nextState[1]).not.toBe(baseState[1]);
});