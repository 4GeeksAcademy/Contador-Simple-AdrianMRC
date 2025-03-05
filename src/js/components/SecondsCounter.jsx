// SecondsCounter.jsx
import React from 'react';
import { FaRegClock } from "react-icons/fa";


const SecondsCounter = ({ seconds, isCountdown }) => {
  const displaySeconds = isCountdown ? Math.max(0, seconds) : seconds;
  const paddedSeconds = displaySeconds.toString().padStart(6, '0');
  const digits = paddedSeconds.split('').map(Number);

  return (
    <div className="counter-container">
      <div className="counter-digit">
        <FaRegClock style={{ fontSize: 'inherit' }}/>
      </div>
      {digits.map((digit, index) => (
        <div key={index} className="counter-digit">
          {digit}
        </div>
      ))}
      {isCountdown && seconds === 0 && (
        <div className="finished-message">¡Tiempo terminado!</div>
      )}
    </div>
  );
};

export default SecondsCounter;