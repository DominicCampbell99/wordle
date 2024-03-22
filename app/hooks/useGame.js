'use client';
import { Box, Stack } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";

const numRows = 5;
const numCols = 5;
const initialArray = [];

for (let i = 0; i < numRows; i++) {
  const row = [];
  for (let j = 0; j < numCols; j++) {
    row.push(undefined);
  }
  initialArray.push(row);
}

const word = 'swept'
const useGame = () => {
    const [guesses, setGuesses] = useState(initialArray);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

    const matchAnywhere = (checkLetter) => {
        return word.some((letter) => letter === checkLetter);
    }
    
    const submitGuess = () => {
        if(currentLetterIndex !== 4) return;
        const newGuesses = guesses[currentGuessIndex].map((letter, index) => {
            if(letter.value === word[index]){
                return {...letter, color: 'green'}
            }
            if([...word].some((char) => char === letter.value)){
                return {...letter, color: '#C9B458'}
            }
            return {...letter, color: 'grey'}
        });
        setGuesses((prevGuesses) => {
            const updatedGuesses = [...prevGuesses];
            updatedGuesses[currentGuessIndex] = newGuesses;
            return updatedGuesses;
        });

        setCurrentLetterIndex(0);
        setCurrentGuessIndex((prev) => prev + 1);
    }

    const isLetter = (key) => {
        return /^[a-zA-Z]$/.test(key);
    };

   const letterPressed = (newLetter) => {
        setGuesses(prevGuesses => {
            const updatedGuesses = [...prevGuesses];
            updatedGuesses[currentGuessIndex][currentLetterIndex] = {value: newLetter, color: 'white'};
            return updatedGuesses;
        });
        setCurrentLetterIndex(prevIndex => {
            const nextIndex = prevIndex + 1;
            return nextIndex;
        });
   }

   const removeLetter = () => {
        setCurrentLetterIndex(prevIndex => {
            if(prevIndex === 0) return 0;
            const nextIndex = prevIndex - 1;
            return nextIndex;
        });
        setGuesses(prevGuesses => {
            const updatedGuesses = [...prevGuesses];
            updatedGuesses[currentGuessIndex][currentLetterIndex-1] = {value: '', color: 'white'};
            return updatedGuesses; 
        });
   }


    const handleKeyPress = (event) => {
        console.log(event, currentLetterIndex);
        if(event.key === 'Enter'){
            console.log('submitted');
            console.log(currentGuessIndex, currentLetterIndex);
            submitGuess();
        }
        if(event.key === 'Backspace'){
            removeLetter();
        }
        if(isLetter(event.key) &&  currentLetterIndex !== numCols){
            letterPressed(event.key)
            console.log(currentGuessIndex)
        } 
    }

    useEffect(() => {
        // Attach event listeners when the component mounts
        document.addEventListener('keydown', handleKeyPress);
        return () => {
        document.removeEventListener('keydown', handleKeyPress);
        };
    });

    useEffect(()=> {
        console.log(guesses)
    }, [guesses])

    return {guesses, handleKeyPress, currentLetterIndex, currentGuessIndex};
}

export default useGame;
