import { useState } from 'react';

function RandomColor() {
  const colors = ['red', 'green', 'blue', 'purple', 'orange'];
  // useState("red") sets the initial color
  const [color, setColor] = useState('red');

  // handleChangeColor selects a random color from the colors array
  // and updates color
  // The paragraph in line 18 then displays the newly selected color,
  // instantly reflecting the updated state
  function handleChangeColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[randomIndex]);
  }

  return (
    <div>
      <p style={{ color }}>The current color is {color}</p>
      <button onClick={handleChangeColor}>Change color</button>
    </div>
  );
}

export default RandomColor;
