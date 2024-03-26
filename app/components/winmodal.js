'use client';

import { Box, Modal, Typography } from "@mui/material";

export default function WinModal({setWin}) {
  
  return (
    <Modal open={win} onClose={()=>setWin(false)}>
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -80%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,

        }}>
            <Typography>You WIN!</Typography>
        </Box>
    </Modal>
  );
}
