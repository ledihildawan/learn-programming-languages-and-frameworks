import { useEffect, useState } from 'react';

function ThemeToggler() {
  // The useState hook initializes isDark to false,
  // managing whether the theme is light or dark
  const [isDark, setIsDark] = useState(false);

  // The useEffect hook updates the page’s backgroundColor and color whenever isDark changes,
  // ensuring the theme is applied dynamically
  useEffect(() => {
    document.body.style.backgroundColor = isDark ? 'black' : 'white';
    document.body.style.color = isDark ? 'white' : 'black';
  }, [isDark]);

  return (
    <div>
      <h2>My ThemeToggler component</h2>
      <button onClick={() => setIsDark(!isDark)}>Switch to {isDark ? 'light' : 'dark'} theme</button>
    </div>
  );
}

export default ThemeToggler;
