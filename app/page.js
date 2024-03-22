'use client';

import styles from "./page.module.css";
import { Stack, Typography } from "@mui/material";
import Word from "./components/word";
import { useEffect, useState } from "react";
import useGame from "./hooks/useGame";

export default function Home() {
  const { guesses } = useGame();

  

  return (
    <main className={styles.main}>
      <div>
        <Typography variant="h5">WORDLE (clone)</Typography>
        <Stack spacing={2}>
          {guesses.map((guess, index) => (
            <Word key={index} letters={guess}></Word>
          ))}
        </Stack>
      </div>
    </main>
  );
}
