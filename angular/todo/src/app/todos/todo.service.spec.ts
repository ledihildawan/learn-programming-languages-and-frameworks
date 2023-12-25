import { TestBed } from '@angular/core/testing';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';
import { TodoEntity, Todo } from './todo.entity';
import { lastValueFrom } from 'rxjs';

const todos: TodoEntity[] = [
  new TodoEntity({ title: 'Workout', complete: true }),
  new TodoEntity({ title: 'Read a book', complete: false }),
];

async function addMultipleTodos(
  todoService: TodoService,
  todos: TodoEntity[]
): Promise<Todo[]> {
  const addedTodos: Todo[] = [];

  for (const todo of todos) {
    const addedTodo: Todo = await lastValueFrom(todoService.addTodo(todo));

    addedTodos.push(addedTodo);
  }

  return addedTodos;
}

async function deleteAllTodos(todoService: TodoService): Promise<void> {
  const todos: Todo[] = await lastValueFrom(todoService.getAllTodos());
  const ids: any[] = todos.map((todo: Todo) => todo?.id);

  for (const id of ids) {
    await lastValueFrom(todoService.deleteTodoById(id));
  }
}

async function setup({
  todos,
  apiService,
  authService,
  todoDataService,
}: {
  todos: TodoEntity[];
  apiService: ApiService;
  authService: AuthService;
  todoDataService: TodoService;
}): Promise<void> {
  await signIn(apiService, authService);
  await deleteAllTodos(todoDataService);
  await addMultipleTodos(todoDataService, todos);
}

async function signIn(
  apiService: ApiService,
  authService: AuthService
): Promise<void> {
  const res: {
    token: string;
    name: string;
  } = await lastValueFrom(apiService.signIn('demo', 'demo'));

  authService.doSign(res.token, res.name);
}

describe('TodoDataService', () => {
  let apiService: ApiService;
  let authService: AuthService;
  let todoDataService: TodoService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService, AuthService, TodoService],
    });

    apiService = TestBed.inject(ApiService);
    authService = TestBed.inject(AuthService);
    todoDataService = TestBed.inject(TodoService);

    await setup({ todos, apiService, authService, todoDataService });
  });

  it('should be created', () => {
    expect(todoDataService).toBeTruthy();
  });

  describe('#getAllTodos()', async () => {
    it('should return all todos', async () => {
      const data: Todo[] = await lastValueFrom(todoDataService.getAllTodos());

      expect(data).toEqual(
        todos.map((todo: Todo, idx: number) => ({ id: idx + 1, ...todo }))
      );
    });
  });

  describe('#save (todo)', async () => {
    it('should automatically assign an incrementing id', async () => {
      const data: Todo[] = await lastValueFrom(todoDataService.getAllTodos());

      expect(data).toEqual(
        todos.map((todo: Todo, idx: number) => ({ id: idx + 1, ...todo }))
      );
    });
  });

  describe('#deleteTodoById', async () => {
    it('should remove todo with the corresponding id', async () => {
      await lastValueFrom(todoDataService.deleteTodoById(2));

      const data: TodoEntity[] = (
        await lastValueFrom(todoDataService.getAllTodos())
      ).map((todo: Todo) => new TodoEntity(todo));

      expect(data).toEqual([new TodoEntity({ id: 1, ...todos[0] })]);
    });
  });

  describe('#updateTodoById(id, values)', async () => {
    it('should return todo with the corresponding id and updated data', async () => {
      const updatedValue: TodoEntity = {
        title: 'Updated Todo 2',
        complete: true,
      };
      const updatedTodo: Todo | null = await lastValueFrom(
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
      let updatedTodo: Todo = await lastValueFrom(
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
