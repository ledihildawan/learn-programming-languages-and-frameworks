import { useState } from 'react';

function CharacterCounter() {
  // The inputText state stores the user’s entered text
  const [inputText, setInputText] = useState('');

  // Whenever the user types, handleChange updates inputText
  function handleChange(event) {
    setInputText(event.target.value);
  }

  // The component shows the current length of the text,
  // reflecting every keystroke instantly
  return (
    <div>
      <input type="text" value={inputText} onChange={handleChange} placeholder="Type something..." />
      <p>Character count: {inputText.length}</p>
    </div>
  );
}

export default CharacterCounter;
