'use client';

import { Stack } from '@mui/material';
import Word from './word';

/**
 * Is a board made of update 6 words each made up of 5 letters creating a 6x5 grid where guesses are entered from left to right - top to bottom
 * @param {Props} props
 * @returns
 */
export default function WordleBoard({
  guesses, shakeLetter, revealWord, shakeWord, gameOver,
}) {
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
          guesses={guesses}
          gameOver={gameOver}
        />
      ))}
    </Stack>
  );
}
