import { Todo } from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const todo: Todo = new Todo({
      id: 0,
      title: 'Learn Angular',
      complete: true,
    });

    expect(todo.title).toEqual('Learn Angular');
    expect(todo.complete).toEqual(true);
  });
});
