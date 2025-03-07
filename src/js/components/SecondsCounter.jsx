import { Box, Paper, Typography } from '@mui/material';
import { FaRegClock } from 'react-icons/fa';

const SecondsCounter = ({ seconds }) => {
  // Formatea los segundos con 6 dígitos rellenados con ceros
  const paddedSeconds = seconds.toString().padStart(6, '0');
  
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 2,
      mt: 4,
      padding: 2
    }}>
      {/* Icono del reloj */}
      <Paper sx={{
        p: 2,
        minWidth: 80,
        textAlign: 'center',
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: 2
      }}>
        <FaRegClock style={{ fontSize: '4rem' }} />
      </Paper>
      
      {/* Dígitos del contador */}
      {[...paddedSeconds].map((digit, index) => (
        <Paper 
          key={index}
          sx={{
            p: 2,
            minWidth: 80,
            textAlign: 'center',
            bgcolor: 'secondary.main',
            color: 'white',
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Typography variant="h2" component="span">
            {digit}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default SecondsCounter;