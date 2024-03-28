'use client';

import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useRef } from "react";

/**
 * A popup modal for when the game is over that contains a short message
 * @param {Props} props 
 */
export default function GameOverModal({onClose, open, msg}) {
  const wrapperRef = useRef(null);
  
  return (
    <Modal open={open} disableAutoFocus onClose={onClose}>
      <Box
        ref={wrapperRef}
        sx={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #EEEEEE',
            borderRadius: '4px',
            boxShadow: 24,
            padding: '1px',
            textAlign: 'center',
        }}
      >
        <Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
          >
            <IconButton onClick={onClose} size="small">
              <Close  />
            </IconButton>
          </Stack>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={200}>
            <Typography variant="h4">{msg}</Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  
  );
}
