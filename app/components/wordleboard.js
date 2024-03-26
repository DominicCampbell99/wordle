'use client';

import { Stack } from "@mui/material";
import Word from "./word";

export default function WordleBoard({guesses, shakeLetter, revealWord, shakeWord}) {

  return (
    <Stack spacing={0.7}>
        {guesses.map((guess, index) => (
            <Word
              key={index} 
              letters={guess} 
              wordIndex={index} 
              shakeLetter={shakeLetter} 
              revealWord={revealWord}
              shakeWord={shakeWord}
            />
        ))}
    </Stack>
  );
}
