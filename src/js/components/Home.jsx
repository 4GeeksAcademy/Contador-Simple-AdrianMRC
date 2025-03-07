import { useState, useEffect, useRef, useCallback } from 'react';
import { Container, TextField, Button, Grid, Paper, Typography, Modal, Box} from '@mui/material';
import { PlayArrow, Pause, Stop, Alarm, Notifications } from '@mui/icons-material';
import SecondsCounter from './SecondsCounter';

const Counter = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true); // Cambiado a true para iniciar automáticamente
  const [isCountdown, setIsCountdown] = useState(false);
  const [initialValue, setInitialValue] = useState('60');
  const [targetTime, setTargetTime] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const alertedTimes = useRef(new Set());

  // Iniciar automáticamente al montar el componente
  useEffect(() => {
    handleStart(false);
  }, []); // Solo se ejecuta al montar

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
        setSeconds(prev => isCountdown ? Math.max(0, prev - 1) : prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isCountdown]);

  useEffect(() => {
    const numericTarget = Number(targetTime);
    if (targetTime && !isNaN(numericTarget)) {
      if (seconds === numericTarget && !alertedTimes.current.has(numericTarget)) {
        setShowAlert(true);
        setIsRunning(false);
        alertedTimes.current.add(numericTarget);
      }
    }
  }, [seconds, targetTime]);

  const handlePauseResume = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setIsCountdown(false);
    setTargetTime('');
    setShowAlert(false);
    handleStart(false); // Reiniciar con el modo automático
  };


  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tiempo inicial (segundos)"
              variant="outlined"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value.replace(/\D/g, ''))}
              type="number"
              slotProps={{ input: { min: 1 } }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Alerta en (segundos)"
              variant="outlined"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value.replace(/[^0-9]/g, ''))}
              type="number"
              slotProps={{ input: { min: 0 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="success"
                startIcon={<PlayArrow />}
                onClick={() => handleStart(false)}
                sx={{ textTransform: 'none' }}
              >
                Iniciar
              </Button>

              <Button
                variant="contained"
                color="warning"
                startIcon={<Alarm />}
                onClick={() => handleStart(true)}
                sx={{ textTransform: 'none' }}
              >
                Cuenta Regresiva
              </Button>

              <Button
                variant="contained"
                color="secondary"
                startIcon={isRunning ? <Pause /> : <PlayArrow />}
                onClick={handlePauseResume}
                disabled={!seconds}
                sx={{ textTransform: 'none' }}
              >
                {isRunning ? 'Pausar' : 'Reanudar'}
              </Button>

              <Button
                variant="contained"
                color="error"
                startIcon={<Stop />}
                onClick={handleReset}
                sx={{ textTransform: 'none' }}
              >
                Reiniciar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <SecondsCounter seconds={isCountdown ? Math.max(0, seconds) : seconds} />
      {isCountdown && seconds === 0 && (
        <Typography variant="h5" color="error" align="center" sx={{ mt: 2 }}>
          ¡Tiempo terminado!
        </Typography>
      )}
      <Modal open={showAlert} onClose={() => setShowAlert(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <Notifications color="primary" sx={{ fontSize: 40, mb: 2 }} />
          <Typography variant="h5" component="h2" gutterBottom>
            ¡Alerta!
          </Typography>
          <Typography variant="body1">
            Se alcanzó el tiempo objetivo
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default Counter;