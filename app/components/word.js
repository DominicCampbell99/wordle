'use client';
import { Stack, } from "@mui/material";
import Letterbox from "./letterbox";

export default function Word({letters, shakeLetter, wordIndex, revealWord, shakeWord, gameOver}) {
    const shake = shakeWord === wordIndex ? 1 : 0;
    return (
        <Stack direction='row' spacing={0.7}>
            {letters.map((letter, index)=> (
                <Letterbox 
                    key={index} 
                    letter={letter} 
                    shakeLetter={shakeLetter} 
                    revealWord={revealWord}
                    shake={shake}
                    letterIndex={index} 
                    wordIndex={wordIndex}
                    gameOver={gameOver}   
                    />
            ))}
        </Stack>
        
    );
}
