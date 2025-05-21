import deleteTodo, { addTodo } from '@/pages/api/actions';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function TodoList() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from('todos').select('todo, id');

  return (
    <>
      <h2>Server Actions Demo</h2>
      <div>
        <form action={addTodo} method="POST">
          <div>
            <label htmlFor="todo">Todo</label>
            <div>
              <input id="todo" name="todo" type="text" placeholder="What needs to be done?" required />
            </div>
          </div>
          <div>
            <button type="submit"> Add Todo</button>
          </div>
        </form>

        <ul>
          {data?.map((todo: any) => (
            <li key={todo.id}>
              <span>{todo.todo}</span>

              <form action={deleteTodo.bind(null, todo.id)}>
                <button className="text-red-400">Delete</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
