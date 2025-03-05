// App.jsx
import { useState, useEffect } from 'react';
import SecondsCounter from './SecondsCounter';

function Counter() {
  const [seconds, setSeconds] = useState(0);
  const [isCountdown, setIsCountdown] = useState(false);
  const [initialValue, setInitialValue] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if(isCountdown) {
          return prev > 0 ? prev - 1 : 0;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isCountdown]);

  return (
    <div className="app-container">
      <div className="controls">
        <input
          type="number"
          value={initialValue}
          onChange={(e) => setInitialValue(Number(e.target.value))}
          min="1"
          placeholder="Segundos iniciales"
        />
        <button onClick={() => {
          setSeconds(initialValue);
          setIsCountdown(true);
        }}>
          Iniciar cuenta regresiva
        </button>
        
        <button onClick={() => {
          setSeconds(0);
          setIsCountdown(false);
        }}>
          Reiniciar contador
        </button>
      </div>

      <SecondsCounter 
        seconds={seconds} 
        isCountdown={isCountdown} 
      />
    </div>
  );
}

export default Counter;