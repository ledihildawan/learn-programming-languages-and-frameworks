// A live word counter using useState and useEffect
import { useEffect, useState } from 'react';

function WordCounter() {
  // Tracks the user’s input text using text
  const [text, setText] = useState('');
  // Tracks the word count using wordCount
  const [wordCount, setWordCount] = useState(0);

  // Uses useEffect to calculate the word count whenever text changes
  useEffect(() => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word);
    setWordCount(words.length);
  }, [text]); // Re-runs when 'text' changes

  return (
    // Provides a text area for user input
    // and displays the live word count
    <div>
      <textarea placeholder="Type your text here..." value={text} onChange={(e) => setText(e.target.value)}></textarea>
      <p>Word Count: {wordCount}</p>
    </div>
  );
}

export default WordCounter;
