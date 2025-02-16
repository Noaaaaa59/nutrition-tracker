import { useEffect, useRef } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import Quagga from 'quagga';

interface Props {
  onDetected: (code: string) => void;
  onError?: (error: string) => void;
}

const BarcodeScanner = ({ onDetected, onError }: Props) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: scannerRef.current,
            constraints: {
              facingMode: 'environment',
            },
          },
          decoder: {
            readers: ['ean_reader', 'ean_8_reader'],
          },
        },
        (err: Error | null) => {
          if (err) {
            console.error(err);
            if (onError) onError('Erreur d\'initialisation de la caméra');
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((result: { codeResult: { code: string } }) => {
        if (result.codeResult.code) {
          onDetected(result.codeResult.code);
        }
      });

      return () => {
        Quagga.stop();
      };
    }
  }, [onDetected, onError]);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2,
        position: 'relative',
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Scanner de code-barres
      </Typography>
      <Box
        ref={scannerRef}
        sx={{
          width: '100%',
          height: 300,
          position: 'relative',
          overflow: 'hidden',
          '& video': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Placez le code-barres dans le cadre
      </Typography>
    </Paper>
  );
};

export default BarcodeScanner;
