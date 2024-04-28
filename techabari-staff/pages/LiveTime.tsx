import React, { useState, useEffect } from 'react';

const LiveTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = currentTime.getHours() % 12 || 12; // Ensure 12-hour format
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div style={{display:'flex'}} >
      <p style={{fontSize:30}}>{hours}:{minutes}:{seconds}</p>
      <p style={{fontSize:10}}>{ampm}</p>
    </div>
  );
};

export default LiveTime;
