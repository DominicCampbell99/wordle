'use client';

import styles from "./page.module.css";
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import Word from "./components/word";
import { useEffect, useState } from "react";
import WinModal from "./components/winmodal";
import { BarChart, HelpOutline, Menu, Settings } from "@mui/icons-material";
import styled from "@emotion/styled";
import Keyboard from "./components/keyboard";

const numRows = 6;
const numCols = 5;
const initialArray = [];

for (let i = 0; i < numRows; i++) {
  const row = [];
  for (let j = 0; j < numCols; j++) {
    row.push({letter: '', letterState: 'not-guessed'});
  }
  initialArray.push(row);
}

const StyledIconButton = styled(IconButton)({
  color: 'black',
  fontSize: 'large',
});

export default function Home() {
  const [guesses, setGuesses] = useState(initialArray);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [revealWord, setRevealWord] = useState(false);
  const [shakeLetter, setShakeLetter] = useState({});
  const [shakeWord, setShakeWord] = useState(false);
  const [win, setWin] = useState(false);
  const [word, setWord] = useState('swept');

  const markGuesses = (currentWordArray) => {
    const newGuesses = currentWordArray.map((letter, index) => {
      if(letter.value === word[index]){
          return {...letter, letterState: 'correct'}
      }
      if([...word].some((char) => char === letter.value)){
          return {...letter, letterState: 'maybe'}
      }
      return {...letter, letterState: 'incorrect'}
    });
    return newGuesses;
  }

  const submitGuess = () => {
      const guessedWord = guesses[currentGuessIndex].map((letter) => letter?.value).join("").toLowerCase();
      ///if there is not a full word shake the letters on submit
      if(guessedWord.length !== 5){
          console.log('not 5 letters');
          setShakeWord(currentGuessIndex);
          return;
      }
      //
      // if(!englishWords.check(guessedWord)){
      //     console.log('not a word');
          ///shakeWord()
      //     return;
      // }
      
      setGuesses((prevGuesses) => {
          const updatedGuesses = [...prevGuesses];
          updatedGuesses[currentGuessIndex] = markGuesses(updatedGuesses[currentGuessIndex]);
          return updatedGuesses;
      });

      setRevealWord(currentGuessIndex);

      if(guessedWord === word){
        setWin(true)
      }else{
        nextTurn();
      }
  }

  ///checks if the key is a letter from a-z
  const isLetter = (key) => {
      return /^[a-zA-Z]$/.test(key);
  };

  ///start the next turn 
  const nextTurn = () => {
      setCurrentLetterIndex(0);
      setCurrentGuessIndex((prev) => prev + 1);
  };

  ///When letter is pressed update guesses and shake letter then move on to next letter
  const letterPressed = (newLetter) => {
      setGuesses(prevGuesses => {
          const updatedGuesses = [...prevGuesses];
          updatedGuesses[currentGuessIndex][currentLetterIndex] = {value: newLetter, letterState: 'guessed'};
          return updatedGuesses;
      });
      setShakeLetter({word: currentGuessIndex, letter: currentLetterIndex});
      setCurrentLetterIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          return nextIndex;
      });
  }

  ///remove the last guessed letter
  const removeLetter = () => {
      setCurrentLetterIndex(prevIndex => {
          if(prevIndex === 0) return 0;
          const nextIndex = prevIndex - 1;
          return nextIndex;
      });
      setShakeLetter(0);
      setGuesses(prevGuesses => {
          const updatedGuesses = [...prevGuesses];
          updatedGuesses[currentGuessIndex][currentLetterIndex-1] = {value: '', letterState: 'not-guessed'};
          return updatedGuesses; 
      });
  }

  ///
  const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
          submitGuess();
      }
      if(event.key === 'Backspace'){
          removeLetter();
      }
      if(isLetter(event.key) &&  currentLetterIndex !== numCols){
          letterPressed(event.key)
      } 
  }

  useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <main className={styles.main}>
      <AppBar sx={{ borderBottom: '1px solid #D3D6DA', backgroundColor: 'white', }} position="fixed" elevation={0}>
        <Toolbar >
          <Box display='flex' flexGrow={1} justifyContent='space-between' alignItems={'center'}>
            <StyledIconButton>
              <Menu />
            </StyledIconButton>
            <Typography variant="h4" color={'black'} fontWeight={700}>
              Wordle
            </Typography>
            <Box>
              <StyledIconButton>
                <HelpOutline />
              </StyledIconButton>
              <StyledIconButton>
                <BarChart />
              </StyledIconButton>
              <StyledIconButton>
                <Settings />
              </StyledIconButton>
            </Box>
           </Box>
        </Toolbar>
      </AppBar>
      {win && (
        <WinModal setWin={setWin} />
      )}
      <div>
        <Stack spacing={0.7}>
          {guesses.map((guess, index) => (
            <Word 
              key={index} 
              letters={guess} 
              wordIndex={index} 
              shakeLetter={shakeLetter} 
              revealWord={revealWord}
              shakeWord={shakeWord === index}
            />
          ))}
        </Stack>
      </div>
      <Keyboard handleKeyPress={handleKeyPress}/>
    </main>
  );
}
