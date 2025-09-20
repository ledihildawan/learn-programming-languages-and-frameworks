import { useState } from 'react';

function ToggleVisibility() {
  // The state isVisible determines if the text should appear
  const [isVisible, setIsVisible] = useState(true);

  function handleToggle() {
    // Calling setIsVisible(!isVisible) flips the current state
    setIsVisible(!isVisible);
  }

  // If isVisible is true, clicking the button hides the text;
  // if it’s false, clicking the button reveals the text again
  return (
    <div>
      {isVisible && <p>This text can be toggled!</p>}
      <button onClick={handleToggle}>{isVisible ? 'Hide' : 'Show'} text</button>
    </div>
  );
}

export default ToggleVisibility;
