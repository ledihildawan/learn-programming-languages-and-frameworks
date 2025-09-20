import { useState } from 'react';

function InteractiveGreeting() {
  const [message, setMessage] = useState('Hello, welcome to our React application!');

  function handleClick() {
    setMessage('Thanks for clicking, have a great day!');
  }

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default InteractiveGreeting;
