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

const getBorderColor = (value, colour) => {
    if(!value) return '2px solid #D3D6DA';
    if(value && !colour) return '2px solid #878A8C';
    if(value && colour) return '0px';
}

const getAnimation = (pulse, shake, colour) => {
    if(pulse && !shake && !colour) return `${pulseAnimation} 0.5s`;
    if(shake) return `${shakeAnimation} 0.5s`;
    if(colour) return `${flipAnimation(colour)} 0.7s ease forwards`;
}

/**
 * Styling for the letterbox with props that dictate colour and animation for the letter
 * @param {Props} props (pulse, value, colour, shake);
 * 
 */
const StyledBox = styled(Box, {shouldForwardProp: (prop) => prop !== "pulse" || prop !== "value" || prop !== "colour" || prop !== 'shake'})(({pulse, value, colour, shake}) => {
    return ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '62px',
    width: '62px',
    color: colour ? 'white' : 'black',
    border: getBorderColor(value, colour),
    backgroundColor: colour,
    perspective: '1000px',
    animation: getAnimation(pulse, shake, colour),
}) } );
    
/**
 * This Letterbox displays a single value in the guess array 
 * Changes it colours based on whether the value has been revealed and the value of the guess
 * Has different animation that can be triggered through props
 * @param {Props} props 
 * @returns 
 */
export default function Letterbox({letter, shakeLetter, wordIndex, letterIndex, revealed, shake, gameOver}) {
    const [pulse, setPulse] = useState(0);
    const [colour, setColour] = useState('')
    ///need to keep track of timeoutid so when the game restarts animations dont continue
    const [timeoutId, setTimeOutId] = useState();
    useEffect(() => {
        if((shakeLetter.word === wordIndex && shakeLetter.letter === letterIndex)){
            setPulse(1);
            setTimeout(() => {
                setPulse(0);
            }, 2000);
        }
    }, [shakeLetter]);

    const getColour = (letterState) => {
        if(letterState === 'incorrect') return '#787C7E';
        
        if(letterState === 'correct') return '#6AAA64';
    
        if(letterState === 'maybe') return '#C9B458';
        return ''
    }

    useEffect(() => {
        const timeoutid = setTimeout(()=> {
            if(revealed){
                const colour = getColour(letter.letterState);
                setColour(colour);
            };
        }, 600*letterIndex);
        setTimeOutId(timeoutid);
    }, [revealed]);

    useEffect(()=> {
        if(!gameOver){
            clearTimeout(timeoutId)
            setPulse(0);
            setColour('');
        }
    }, [gameOver])
    

    return (
        <StyledBox key={colour} pulse={pulse} value={letter?.value} colour={colour} shake={shake}>
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
