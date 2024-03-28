
/*
Hook that controls the game
*/
'use client';

import { useState } from "react";

const numRows = 6;
const numCols = 5;

/**
 * 
 *  @property {Function} restartGame restarts the wordle game
 *  @property {Function} handleKeyPress take a key press enter and modifies the gameState based on the key
 *  @property {Function} setError sets an error to flag with the player
 * 
 * , guesses, handleKeyPress, revealWord, gameOver, shakeWord, shakeLetter, msg, word , error, setError
 * 
 */
export const useGame = () => {
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [guesses, setGuesses] = useState();
  const [revealWord, setRevealWord] = useState(-1);
  const [shakeLetter, setShakeLetter] = useState({});
  const [shakeWord, setShakeWord] = useState(-1);
  const [gameOver, setGameOver] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [word, setWord] = useState('');

  /*
  When word is revealed goes through and marks each of the guesses and updates keyboard
  returns array of the marked guesses
  */
  const markGuesses = (guessNumber) => {
    setGuesses((prevGuesses) => {
      const updatedGuesses = [...prevGuesses];
      const currentGuess = updatedGuesses[guessNumber];
      const markedGuess = currentGuess.map((letter, index) => {
        if(letter.value === word[index]){
          return {...letter, letterState: 'correct'};
        }
        if([...word].some((char) => char === letter.value)){
            return {...letter, letterState: 'maybe'};
        }
        return {...letter, letterState: 'incorrect'};
      });
      updatedGuesses[guessNumber] = markedGuess
      return updatedGuesses;
    });

    setRevealWord(guessNumber);
  };

  const shakeThisWord = (wordIndex) => {
    setShakeWord(wordIndex);
    setTimeout(() => {
      setShakeWord(-1);
    }, 500);
  }

  /*
  handles the following logic for when a guess is sumbitted:
    1. checks if its a valid word
    2. reveals the state of each of the letters if it is a valid word
    3. calculates whether the player has won or lost
    4. if neither initiates the next turn 
  */
  const submitGuess = async () => {
      const guessedWord = guesses[currentGuessIndex].map((letter) => letter?.value).join("").toLowerCase();
      if(guessedWord.length !== 5){
          shakeThisWord(currentGuessIndex);
          setError('Word is Not 5 Letters in length!');
          return;
      }
      const response = await fetch(`/api/check?word=${guessedWord}`);
      const body = await response.json();

      if(!body.exists){
        shakeThisWord(currentGuessIndex);
        setError('Word is not in the word list!');
        return;
      };

      markGuesses(currentGuessIndex)

      if(guessedWord === word){
        setMsg('Congrats! You Win!');
        setGameOver(true);
        return;
      }
      if((currentGuessIndex + 1) > 5){
        setMsg(`Unlucky You Lose the word was ${word}`);
        setGameOver(true);
        return
      }
      nextTurn();

  }

  const isLetter = (key) => {
      return /^[a-zA-Z]$/.test(key);
  };

  ///start the next turn 
  const nextTurn = () => {
      setCurrentLetterIndex(0);
      setCurrentGuessIndex((prev) => prev + 1);
  };
  
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
      setGuesses(prevGuesses => {
          const updatedGuesses = [...prevGuesses];
          updatedGuesses[currentGuessIndex][currentLetterIndex-1] = {value: '', letterState: 'not-guessed'};
          return updatedGuesses; 
      });
  }

  ///handles all key press events
  const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
          submitGuess();
      }
      if(event.key === 'Backspace'){
          removeLetter();
      }
      if(isLetter(event.key) &&  currentLetterIndex !== numCols){
          letterPressed(event.key.toLowerCase());
      } 
  }

  const getNewWord = async () => {
    const response = await fetch(`/api/getword`);
    const body = await response.json();
    setWord(body.word);
    console.log(body.word);
  }

  const restartGame = () => {
    setCurrentGuessIndex(0);
    setCurrentLetterIndex(0);
    setGameOver(false);
    setRevealWord(-1);
    getNewWord();
    clearBoard();
  }

  const clearBoard = () => {
    const initialArray = [];
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
        row.push({value: '', letterState: 'not-guessed'});
        }
        initialArray.push(row);
    }
    setGuesses(initialArray);
  }
 
  return {restartGame, guesses, handleKeyPress, revealWord, gameOver, shakeWord, shakeLetter, msg, word , error, setError}
    
}
