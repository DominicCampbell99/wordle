'use client';

import { Alert, Snackbar } from "@mui/material";


export default function GameWarning({error, setError}) {
  
  return (
    <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={error}
    onClose={()=> setError('')}
    autoHideDuration={4000}
    >
        <Alert
        onClose={()=> setError('')}
        variant="filled"
        severity="error"
        sx={{ width: '100%' }}
        >
            {error}
        </Alert>
    </Snackbar>
  );
}
