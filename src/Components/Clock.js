import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const currentHour = time.getHours();
  const currentMinute = time.getMinutes();

  return (
    <div>
      <span>{currentHour < 10 ? '0' + currentHour : currentHour}</span>
      :
      <span>{currentMinute < 10 ? '0' + currentMinute : currentMinute}</span>
    </div>
  );
}

export default Clock;
