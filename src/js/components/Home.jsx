import { useState, useEffect, useRef, useCallback } from 'react';
import { Container, TextField, Button, Grid2, Paper, Typography, Modal, Box } from '@mui/material';
import { PlayArrow, Pause, Stop, Alarm, Notifications } from '@mui/icons-material';
import SecondsCounter from './SecondsCounter';

const Counter = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isCountdown, setIsCountdown] = useState(false);
  const [initialValue, setInitialValue] = useState('60');
  const [targetTime, setTargetTime] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const alertedTimes = useRef(new Set());

  const handleStart = useCallback((countdown = false) => {
    setIsCountdown(countdown);
    setSeconds(countdown ? parseInt(initialValue) || 0 : 0);
    setIsRunning(true);
    setShowAlert(false);
    alertedTimes.current.clear();
  }, [initialValue]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => {
          const next = isCountdown ? Math.max(0, prevSeconds - 1) : prevSeconds + 1;
          const target = Number(targetTime);
          if (target && next === target && !alertedTimes.current.has(target)) {
            setShowAlert(true);
            setIsRunning(false);
            alertedTimes.current.add(target);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isCountdown, targetTime]);

  const handlePauseResume = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setIsCountdown(false);
    setTargetTime('');
    setShowAlert(false);
    handleStart(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tiempo inicial (s)"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value.replace(/\D/g, ''))}
              type="number"
              size="small"
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Alerta en (s)"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value.replace(/\D/g, ''))}
              type="number"
              size="small"
            />
          </Grid2>
          <Grid2 item xs={12}>
            <Grid2 container spacing={1} justifyContent="center">
              {[
                { color: 'success', icon: <PlayArrow />, text: 'Iniciar', onClick: () => handleStart(false) },
                { color: 'warning', icon: <Alarm />, text: 'Cuenta Regresiva', onClick: () => handleStart(true) },
                { color: 'secondary', icon: isRunning ? <Pause /> : <PlayArrow />, text: isRunning ? 'Pausar' : 'Reanudar', onClick: handlePauseResume, disabled: !seconds },
                { color: 'error', icon: <Stop />, text: 'Reiniciar', onClick: handleReset }
              ].map((btn, i) => (
                <Button
                  key={i}
                  variant="contained"
                  color={btn.color}
                  startIcon={btn.icon}
                  onClick={btn.onClick}
                  disabled={btn.disabled}
                  size="small"
                  sx={{ m: 0.5 }}
                >
                  {btn.text}
                </Button>
              ))}
            </Grid2>
          </Grid2>
        </Grid2>
      </Paper>

      <SecondsCounter seconds={seconds} />
      {isCountdown && !seconds && (
        <Typography variant="h5" color="error" align="center" sx={{ mt: 2 }}>
          ¡Tiempo terminado!
        </Typography>
      )}
      <Modal open={showAlert} onClose={() => setShowAlert(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', boxShadow: 24, p: 3, textAlign: 'center' }}>
          <Notifications color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h6">¡Alerta!</Typography>
          <Typography>Se alcanzó el tiempo</Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default Counter;