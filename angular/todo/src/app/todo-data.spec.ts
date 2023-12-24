import { TestBed } from '@angular/core/testing';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

describe('TodoDataService', () => {
  function addTodo(value: any, bulk = true, service = todoDataService): void {
    if (!bulk) {
      service.addTodo(value);
      return;
    }

    for (const v of value) {
      service.addTodo(v);
    }
  }

  const todos: Todo[] = [1, 2].map((num: number) => {
    return new Todo({
      id: num,
      title: `Hello ${num}`,
      complete: num % 2 === 0,
    });
  });

  let todoDataService: TodoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TodoDataService] });

    addTodo(todos, true, (todoDataService = TestBed.inject(TodoDataService)));
  });

  it('should ...', () => {
    expect(todoDataService).toBeTruthy();
  });

  describe('#getAllTodos()', () => {
    it('should return an empty array by default', () => {
      todoDataService.reset();

      expect(todoDataService.getAllTodos()).toEqual([]);
    });

    it('should return all todos', () => {
      expect(todoDataService.getAllTodos()).toEqual(todos);
    });
  });

  describe('#save (todo)', () => {
    it('should automatically assign an incrementing id', () => {
      expect(todoDataService.getTodoById(1)).toEqual(todos.at(0));
      expect(todoDataService.getTodoById(2)).toEqual(todos.at(1));
    });
  });

  describe('#deleteTodoById', () => {
    it('should remove todo with the corresponding id', () => {
      todoDataService.deleteTodoById(1);

      expect(todoDataService.getAllTodos()).toEqual([todos[1]]);

      todoDataService.deleteTodoById(2);

      expect(todoDataService.getAllTodos()).toEqual([]);
    });

    it('should not removing anything if todo with corresponding id is not found', () => {
      addTodo(new Todo({ id: 3, title: 'Hello 3', complete: true }), false);

      todoDataService.deleteTodoById(3);

      expect(todoDataService.getAllTodos()).toEqual(todos);
    });
  });

  describe('#updateTodoById(id, values)', () => {
    it('should return todo with the corresponding id and updated data', () => {
      const updatedTodo: Todo | null = todoDataService.updateTodo(1, {
        title: 'new title',
      });

      expect(updatedTodo?.title).toEqual('new title');
    });

    it('should return null if todo is not found', () => {
      const updatedTodo: Todo | null = todoDataService.updateTodo(3, {
        complete: true,
      });

      expect(updatedTodo).toEqual(null);
    });
  });

  describe('#toggleTodoComplete(todo)', () => {
    it('should return the updated todo with inverse complete status', () => {
      const updatedTodo: Todo | null = todoDataService.toggleTodoComplete(
        todos[0]
      );

      expect(updatedTodo?.complete).toEqual(true);
      expect(updatedTodo?.complete).toEqual(true);
    });
  });
});
