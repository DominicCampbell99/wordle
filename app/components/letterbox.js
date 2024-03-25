'use client';
import { Box, Stack, Typography, keyframes, styled } from "@mui/material";
import { useEffect, useState } from "react";
import styles from './word.module.css';

export default function Letterbox({letter, shakeLetter, wordIndex, letterIndex, revealWord}) {
    const boxClassName = styles['shaking-box']
    const [shouldShake, setShouldShake] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const shake = shouldShake ? styles['shake'] : '';
    const revealedCss = revealed ? styles[letter?.letterState] : '';
    const guessed = letter?.letterState === 'guessed' ? styles['guessed'] : '';    
    
    useEffect(() => {
        if((shakeLetter.word === wordIndex && shakeLetter.letter === letterIndex)){
            console.log(`shaking ${letterIndex} ${wordIndex}`);
            setShouldShake(true);
        }
    }, [shakeLetter]);


    useEffect(() => {
        setTimeout(()=> {
            if(revealWord === wordIndex){
                setRevealed(true);
            };
        }, 500*letterIndex);
    }, [revealWord]);

    return (
        <div 
            className={`${boxClassName} ${revealedCss} ${shake} ${guessed}`}
        >
            <Typography 
            textTransform={'capitalize'} 
            fontSize={28}
            sx={{
                fontWeight: 600
            }}
            >{letter?.value ? letter?.value : ''}
            </Typography>
        </div>
    );
}
