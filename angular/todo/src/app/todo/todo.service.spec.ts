import { TestBed } from '@angular/core/testing';
import { TodoEntity } from './todo.entity';
import { lastValueFrom } from 'rxjs';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';

const todos: TodoEntity[] = [
  new TodoEntity({ title: 'Workout', complete: true }),
  new TodoEntity({ title: 'Read a book', complete: false }),
];

async function addMultipleTodos(
  todoService: TodoService,
  todos: TodoEntity[]
): Promise<TodoEntity[]> {
  const addedTodos: TodoEntity[] = [];

  for (const todo of todos) {
    const addedTodo: TodoEntity = await lastValueFrom(
      todoService.addTodo(todo)
    );

    addedTodos.push(addedTodo);
  }

  return addedTodos;
}

async function deleteAllTodos(todoService: TodoService): Promise<void> {
  const todos: TodoEntity[] = await lastValueFrom(todoService.getAllTodos());
  const ids: any[] = todos.map((todo: TodoEntity) => todo?.id);

  for (const id of ids) {
    await lastValueFrom(todoService.deleteTodoById(id));
  }
}

describe('TodoDataService', () => {
  let todoDataService: TodoService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TodoService],
    });

    todoDataService = TestBed.inject(TodoService);

    await deleteAllTodos(todoDataService);
    await addMultipleTodos(todoDataService, todos);
  });

  it('should be created', () => {
    expect(todoDataService).toBeTruthy();
  });

  describe('#getAllTodos()', async () => {
    it('should return all todos', async () => {
      const data: TodoEntity[] = await lastValueFrom(
        todoDataService.getAllTodos()
      );

      expect(data).toEqual(
        todos.map((todo: TodoEntity, idx: number) => ({ id: idx + 1, ...todo }))
      );
    });
  });

  describe('#save (todo)', async () => {
    it('should automatically assign an incrementing id', async () => {
      const data: TodoEntity[] = await lastValueFrom(
        todoDataService.getAllTodos()
      );

      expect(data).toEqual(
        todos.map((todo: TodoEntity, idx: number) => ({ id: idx + 1, ...todo }))
      );
    });
  });

  describe('#deleteTodoById', async () => {
    it('should remove todo with the corresponding id', async () => {
      await lastValueFrom(todoDataService.deleteTodoById(2));
    });
  });

  describe('#updateTodoById(id, values)', async () => {
    it('should return todo with the corresponding id and updated data', async () => {
      const updatedValue: TodoEntity = {
        title: 'Updated Todo 2',
        complete: true,
      };
      const updatedTodo: TodoEntity | null = await lastValueFrom(
        todoDataService.updateTodoById(1, updatedValue)
      );

      expect(updatedTodo).toEqual({
        id: updatedTodo?.id,
        ...updatedValue,
      });
    });
  });

  describe('#toggleTodoComplete(todo)', async () => {
    it('should return the updated todo with inverse complete status', async () => {
      let updatedTodo: TodoEntity = await lastValueFrom(
        todoDataService.toggleTodoComplete({ id: 1, ...todos[0] })
      );

      expect(updatedTodo.complete).toEqual(false);

      updatedTodo = await lastValueFrom(
        todoDataService.toggleTodoComplete(updatedTodo)
      );

      expect(updatedTodo.complete).toEqual(true);
    });
  });
});
