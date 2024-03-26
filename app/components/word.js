'use client';
import { Stack, } from "@mui/material";
import Letterbox from "./letterbox";

export default function Word({letters, shakeLetter, wordIndex, revealWord, shakeWord}) {
    const shake = shakeWord === wordIndex ? true : undefined;
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
                    wordIndex={wordIndex}  />
            ))}
        </Stack>
        
    );
}
