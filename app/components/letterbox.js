'use client';
import { Box, Stack, Typography, keyframes, styled } from "@mui/material";
import { useEffect, useState } from "react";
import styles from './word.module.css';

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

const flipAnimation = keyframes`
    transform: rotateX(360);
`;
const getColor = (letterState) => {
    if(letterState === 'incorrect') return '#787C7E';
    
    if(letterState === 'correct') return '#6AAA64';

    if(letterState === 'maybe') return '#C9B458';
}

const getBorderColor = (guessed, revealed) => {
    if(!guessed && !revealed) return '2px solid #D3D6DA';
    if(guessed && !revealed) return '2px solid #878A8C';
    if(guessed && revealed) return '0px';
}

const getAnimation = (pulse, shake, flip) => {
    if(pulse && !shake) return `${pulseAnimation} 0.5s`;
    if(shake) return `${shakeAnimation} 0.5s`;
    if(flip) return `${flipAnimation} 0.5s`;
}

const StyledBox = styled(Box, {shouldForwardProp: (prop) => prop !== "pulse" || prop !== "guessed" || prop !== "letterState" || prop !== 'revealed' || prop !== 'shakeWord'})(({pulse, guessed, revealed, letterState, shakeWord}) => {
    console.log(pulse, guessed, revealed, letterState, shakeWord);
    return ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '62px',
    width: '62px',
    border: getBorderColor(guessed, revealed),
    perspective: '1000px',
    animation: getAnimation(pulse, shakeWord, revealed),
    backgroundColor: revealed ? getColor(letterState) : ''
}) } );
    

export default function Letterbox({letter, shakeLetter, wordIndex, letterIndex, revealWord, shakeWord}) {
    const [pulse, setPulse] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [guessed, setGuessed] = useState(false);
    const [letterState, setLetterState] = useState('')
    useEffect(() => {
        if((shakeLetter.word === wordIndex && shakeLetter.letter === letterIndex)){
            console.log(`shaking ${letterIndex} ${wordIndex}`);
            setPulse(true);
        }
    }, [shakeLetter]);

    useEffect(() => {
        if((letter?.letter !== '')){
            setGuessed(true);
        }
    }, [letter]);

    useEffect(() => {
        setTimeout(()=> {
            if(revealWord === wordIndex){
                setRevealed(true);
                setLetterState(letter?.letterState);
            };
        }, 500*letterIndex);
    }, [revealWord]);

    return (
        <StyledBox pulse={pulse} revealed={revealed} guessed={guessed} letterState={letterState} shakeWord={shakeWord}>
            <Typography 
            textTransform={'capitalize'} 
            fontSize={28}
            sx={{
                fontWeight: 600
            }}
            >{letter?.value ? letter?.value : ''}
            </Typography>
        </StyledBox>
    );
}
