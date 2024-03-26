'use client';

import styled from "@emotion/styled";
import { Backspace } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";

const StyledButton = styled(Button)({
    color: 'black',
    height: '58px',
    backgroundColor: '#D3D6DA',
    textAlign: 'center',
    borderRadius: '4px',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#D3D6DA',
    }
});

const keyboardRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const keyboardRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const keyboardRow3 = ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'];


export default function Keyboard({handleKeyPress}) {
    
  const keyButton = (key) => {
    if(key === 'Enter') return <StyledButton onClick={()=>handleKeyPress({key: key})} key={key}><Typography fontWeight={700}>{key}</Typography></StyledButton>;

    if(key === 'Backspace') return <StyledButton onClick={(e)=>handleKeyPress({key: key})} key={key}><Backspace></Backspace></StyledButton>
                    
    return (
    <StyledButton sx={{width:'20px',
    padding: '0px',
    maxWidth: '44px', 
    minWidth: '44px', }}
    key={key}
    onClick={()=>handleKeyPress({key: key})}
    >
        <Typography fontWeight={700}>{key}</Typography>
    </StyledButton>)
  }

  return (
    <Stack spacing={1}>
        <Stack direction={'row'} spacing={0.5}>
            {keyboardRow1.map((key) => (
                keyButton(key)
            ))}
        </Stack>
        <Stack direction={'row'} spacing={0.5} paddingLeft={3}>
            {keyboardRow2.map((key) => (
                keyButton(key)
            ))}
        </Stack>
        <Stack direction={'row'} spacing={0.5}>
            {keyboardRow3.map((key) => (
                keyButton(key)
            ))}
        </Stack>
    </Stack>
  );
}
