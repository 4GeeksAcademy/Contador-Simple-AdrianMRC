import { Box, Paper, Typography } from '@mui/material';
import { FaRegClock } from 'react-icons/fa';

const SecondsCounter = ({ seconds }) => {

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
      
      <Paper sx={{
        p: 2,
        minWidth: 80,
        textAlign: 'center',
        bgcolor: '#0032b0',
        color: 'white',
        borderRadius: 2
      }}>
        <FaRegClock style={{ fontSize: '4rem' }} />
      </Paper>
      
      {[...paddedSeconds].map((digit, index) => (
        <Paper 
          key={index}
          sx={{
            p: 2,
            minWidth: 80,
            textAlign: 'center',
            bgcolor: '#1aa1c5',
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