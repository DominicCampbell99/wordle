'use client';
import { Box, Stack } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
// import isWord from "is-word";

// const englishWords = isWord('british-english');
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

const word = 'swept'
const useGame = () => {
    const [guesses, setGuesses] = useState(initialArray);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
    const [revealWord, setRevealWord] = useState(false);
    const [shakeLetter, setShakeLetter] = useState({});
    const [win, setWin] = useState(false);

    const submitGuess = () => {
        const guessedWord = guesses[currentGuessIndex].map((letter) => letter?.value).join("");
        console.log(guessedWord);
        if(guessedWord.length !== 5){
            console.log('not 5 letters');
            return;
        }
        // if(!englishWords.check(guessedWord)){
        //     console.log('not a word');
        //     return;
        // }
        const newGuesses = guesses[currentGuessIndex].map((letter, index) => {
            if(letter.value === word[index]){
                return {...letter, letterState: 'correct', shake: true}
            }
            if([...word].some((char) => char === letter.value,)){
                return {...letter, letterState: 'maybe', shake: true}
            }
            return {...letter, letterState: 'incorrect', shake: true}
        });

        setGuesses((prevGuesses) => {
            const updatedGuesses = [...prevGuesses];
            updatedGuesses[currentGuessIndex] = newGuesses;
            return updatedGuesses;
        });
        setRevealWord(currentGuessIndex);
        if(guessedWord === word){
            setWin(true);
        }else{
            nextTurn();
        }
    }

    const isLetter = (key) => {
        return /^[a-zA-Z]$/.test(key);
    };

    const nextTurn = () => {
        setCurrentLetterIndex(0);
        setCurrentGuessIndex((prev) => prev + 1);
    }
   const letterPressed = (newLetter) => {
        setGuesses(prevGuesses => {
            const updatedGuesses = [...prevGuesses];
            updatedGuesses[currentGuessIndex][currentLetterIndex] = {value: newLetter, letterState: 'guessed', shake: true};
            return updatedGuesses;
        });
        setCurrentLetterIndex(prevIndex => {
            const nextIndex = prevIndex + 1;
            return nextIndex;
        });
        setShakeLetter({word: currentGuessIndex, letter: currentLetterIndex});
   }

   const removeLetter = () => {
        setCurrentLetterIndex(prevIndex => {
            if(prevIndex === 0) return 0;
            const nextIndex = prevIndex - 1;
            return nextIndex;
        });
        setGuesses(prevGuesses => {
            const updatedGuesses = [...prevGuesses];
            updatedGuesses[currentGuessIndex][currentLetterIndex-1] = {value: '', letterState: 'not-guessed'};
            return updatedGuesses; 
        });
   }

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
        // Attach event listeners when the component mounts
        document.addEventListener('keydown', handleKeyPress);
        return () => {
        document.removeEventListener('keydown', handleKeyPress);
        };
    });

    return {guesses, handleKeyPress, currentLetterIndex, currentGuessIndex, shakeLetter, revealWord};
}

export default useGame;
