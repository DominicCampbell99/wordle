'use client';
import { Box, Typography, keyframes, styled } from "@mui/material";
import { useEffect, useState } from "react";

const pulseAnimation = keyframes`
    0% { 
        transform: scale(1);
    }
    50% { 
        transform: scale(1.2);
    }
    100% { 
        transform: scale(1);
    }
`;

const shakeAnimation = keyframes`
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0eg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
`;

const flipAnimation = (colour) => keyframes`
     0% { 
        transform: rotateX(0deg);
    }
    45% { 
        transform: rotateX(90deg);
    }
    55% { 
        transform: rotateX(90deg);
    }
    100% { 
        transform: rotateX(0deg);
     }
`;

const getColor = (letterState, revealed) => {
    if(revealed && letterState === 'incorrect') return '#787C7E';
    
    if(revealed && letterState === 'correct') return '#6AAA64';

    if(revealed && letterState === 'maybe') return '#C9B458';
    
}

const getBorderColor = (guessed, revealed) => {
    if(!guessed && !revealed) return '2px solid #D3D6DA';
    if(guessed && !revealed) return '2px solid #878A8C';
    if(guessed && revealed) return '0px';
}

const getAnimation = (pulse, shake, flip, colour) => {
    if(pulse && !shake && !flip) return `${pulseAnimation} 0.5s`;
    if(shake) return `${shakeAnimation} 0.5s`;
    if(flip) return `${flipAnimation(colour)} 0.7s ease forwards`;
}

const StyledBox = styled(Box, {shouldForwardProp: (prop) => prop !== "pulse" || prop !== "guessed" || prop !== "colour" || prop !== 'revealed' || prop !== 'shake'})(({pulse, guessed, revealed, colour, shake}) => {
    return ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '62px',
    width: '62px',
    border: getBorderColor(guessed, revealed),
    backgroundColor: getColor(colour, revealed),
    perspective: '1000px',
    animation: getAnimation(pulse, shake, revealed),
}) } );
    

export default function Letterbox({letter, shakeLetter, wordIndex, letterIndex, revealWord, shake, gameOver}) {
    const [pulse, setPulse] = useState(0);
    const [revealed, setRevealed] = useState(0);
    const [guessed, setGuessed] = useState(0);
    const [colour, setColour] = useState('')
    
    useEffect(() => {
        if((shakeLetter.word === wordIndex && shakeLetter.letter === letterIndex)){
            console.log(`shaking ${letterIndex} ${wordIndex}`);
            setPulse(1);
            setTimeout(() => {
                setPulse(0);
            }, 2000);
        }
    }, [shakeLetter]);

    useEffect(() => {
        if((letter?.value !== '')){
            setGuessed(1);
        }else{
            setGuessed(0)
        }
    }, [letter]);

    useEffect(() => {
        setTimeout(()=> {
            if(revealWord === wordIndex){
                setRevealed(1);
                setColour(letter?.letterState);
            };
        }, 600*letterIndex);
    }, [revealWord]);

    useEffect(() => {
        if(!gameOver){
            setRevealed(0);
            setGuessed(0);
            setPulse(0);
            setColour('');
        }
    }, [gameOver]);

    return (
        <StyledBox key={colour} pulse={pulse} revealed={revealed} guessed={guessed} colour={colour} shake={shake}>
            <Typography 
            textTransform={'capitalize'} 
            fontSize={28}
            color={revealed ? 'white' : 'black'}
            sx={{
                fontWeight: 600
            }}
            >{letter?.value ? letter?.value : ''}
            </Typography>
        </StyledBox>
    );
}
