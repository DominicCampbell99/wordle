'use client';

import styled from "@emotion/styled";
import { Backspace } from "@mui/icons-material";
import {  Button,  Typography } from "@mui/material";
import { useEffect, useState } from "react";

const StyledButton = styled(Button)({
    color: 'black',
    height: '58px',
    textAlign: 'center',
    borderRadius: '4px',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#D3D6DA',
    }
});

const getColor = (letterState) => {
    if(letterState === 'incorrect') return '#787C7E';
    if(letterState === 'correct') return '#6AAA64';
    if(letterState === 'maybe') return '#C9B458';
    return '#D3D6DA'
}


export default function KeyButton({keyletter, keyStates, handleKeyPress}) {
    const [colour, setColour] = useState('#D3D6DA');
    
    useEffect(() => {
        const newColour = getColor(keyStates.get(keyletter.toLowerCase()));
        setColour(newColour);
    }, [keyStates])

    if(keyletter === 'Enter'){
        return (<StyledButton 
        onClick={()=>handleKeyPress({key: keyletter})} 
        sx={{
            backgroundColor: colour
        }}
        >
            <Typography fontWeight={700}>{keyletter}</Typography>
        </StyledButton>
        )
    }
    if(keyletter === 'Backspace') {
        return (
            <StyledButton 
            sx={{
            backgroundColor: colour
        }}
            onClick={(e)=>handleKeyPress({key: keyletter})} key={keyletter}>
                <Backspace />
            </StyledButton>
        )
    }      
    return (
    <StyledButton 
        sx={{
            width:'20px',
            padding: '0px',
            maxWidth: '44px', 
            minWidth: '44px',
            backgroundColor: colour,
        }}
    keyletter={keyletter}
    onClick={()=>handleKeyPress({key: keyletter})}
    >
        <Typography fontWeight={700}>{keyletter}</Typography>
    </StyledButton>)

}
