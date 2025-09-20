// A timer with a reset button using useState and useEffect
import { useEffect, useState } from 'react';

function TimerComponent() {
  // Tracks the elapsed time using seconds
  const [seconds, setSeconds] = useState(0);

  // Sets up an interval to increment seconds every second
  // The cleanup function ensures the interval stops,
  // when the component unmounts
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // Runs once on mount

  return (
    // Displays the elapsed time and a button to reset the timer
    <div>
      <p>Elapsed Time: {seconds} seconds</p>
      <button onClick={() => setSeconds(0)}>Reset Timer</button>
    </div>
  );
}

export default TimerComponent;
