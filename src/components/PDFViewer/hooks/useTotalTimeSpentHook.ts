import { useState, useEffect, useRef } from 'react';

export function useTotalTimeSpent() {
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Date.now() - startTimeRef.current);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeSpent(0);
    startTimeRef.current = Date.now();
  }, []);

  return timeSpent;
}
