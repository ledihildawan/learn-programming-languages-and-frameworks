import { useState } from 'react';

export default function Home() {
  const [todoItem, setTodoItem] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Send a POST request to the API route with the todo item
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todoItem }),
      });

      if (response.ok) {
        console.log('Todo item added successfully');
      } else {
        console.error('Failed to add todo item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Todo Application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Todo Item:
          <input type="text" value={todoItem} onChange={(e) => setTodoItem(e.target.value)} />
        </label>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
