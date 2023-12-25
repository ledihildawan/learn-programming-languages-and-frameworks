import { TodoEntity } from './todo.entity';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new TodoEntity()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const todo: TodoEntity = new TodoEntity({
      id: 0,
      title: 'Learn Angular',
      complete: true,
    });

    expect(todo.title).toEqual('Learn Angular');
    expect(todo.complete).toEqual(true);
  });
});
