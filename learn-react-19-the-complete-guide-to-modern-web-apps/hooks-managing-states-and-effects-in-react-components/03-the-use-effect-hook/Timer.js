import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(interval); // Cleanup function
  }, []);

  return <p>Elapsed time: {seconds} seconds</p>;
}

export default Timer;
