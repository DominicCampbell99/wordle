'use client';
import { Box, Stack, Typography, keyframes, styled } from "@mui/material";
import Letterbox from "./letterbox";

export default function Word({letters, shakeLetter, wordIndex, revealWord}) {
    return (
        <Stack direction='row' spacing={0.7}>
            {letters.map((letter, index)=> (
                <Letterbox key={index} 
                    letter={letter} 
                    shakeLetter={shakeLetter} 
                    revealWord={revealWord}
                    letterIndex={index} 
                    wordIndex={wordIndex}  />
            ))}
        </Stack>
        
    );
}
