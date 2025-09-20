// A background color toggle using useState and useEffect
import { useEffect, useState } from 'react';

function ColorToggle() {
  // Manages the current background color using isDark
  const [isDark, setIsDark] = useState(false);

  // Sets up an interval to toggle the color every 5 seconds,
  // and ensures cleanup when the component unmounts
  useEffect(() => {
    const timer = setInterval(() => {
      setIsDark((prevIsDark) => !prevIsDark);
    }, 5000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    // Dynamically applies the background color based on isDark
    <div
      style={{
        height: '100vh',
        backgroundColor: isDark ? 'black' : 'white',
        color: isDark ? 'white' : 'black',
      }}
    >
      <p>The background color changes every 5 seconds.</p>
    </div>
  );
}

export default ColorToggle;
