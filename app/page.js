'use client';

import styles from "./page.module.css";
import { useEffect,  useState } from "react";
import WinModal from "./components/winmodal";
import Keyboard from "./components/keyboard";
import Header from "./components/header";
import WordleBoard from "./components/wordleboard";

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

export default function Home() {
  const [guesses, setGuesses] = useState(initialArray);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [revealWord, setRevealWord] = useState('');
  const [shakeLetter, setShakeLetter] = useState({});
  const [shakeWord, setShakeWord] = useState(false);
  const [win, setWin] = useState(false);
  const [keyStates, setKeyStates] = useState(new Map());
  const [word, setWord] = useState('swept');

  const changeKeyState = (oldValue, newState) => {
    if(newState === 'correct') return 'correct';
    if(newState === 'maybe' && oldValue !== 'correct') return 'maybe'; 
    if(newState === 'guessed' && oldValue == 'not-guessed') return 'guessed';
    return oldValue;
  }

  const updateMap = (key, newState) => {
    if(keyStates.has(key)){
      setKeyStates(prevMap => {
        const oldValue = prevMap.get(key);
        const newValue = changeKeyState(oldValue, newState);
        return prevMap.set(key, newValue);
      })
      } else{
      setKeyStates(prevMap => new Map([...prevMap.entries(), [key, newState]]));
    }
  };

  const markGuesses = (currentWordArray) => {
    const newGuesses = currentWordArray.map((letter, index) => {
      if(letter.value === word[index]){
          updateMap(letter.value, 'correct');
          return {...letter, letterState: 'correct'}
      }
      if([...word].some((char) => char === letter.value)){
          updateMap(letter.value, 'maybe');
          return {...letter, letterState: 'maybe'}
      }
      updateMap(letter.value, 'incorrect');
      return {...letter, letterState: 'incorrect'}
    });
    return newGuesses;
  }


  const submitGuess = () => {
      const guessedWord = guesses[currentGuessIndex].map((letter) => letter?.value).join("").toLowerCase();
      ///if there is not a full word shake the letters on submit
      if(guessedWord.length !== 5){
          console.log('not 5 letters', currentGuessIndex);
          setShakeWord(currentGuessIndex);
          return;
      }
      
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


  ///used to listen to all keyboard inputs by a user
  useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <main className={styles.main}>
      <Header />
      {win && (
        <WinModal setWin={setWin} win={win}/>
      )}
      <WordleBoard guesses={guesses} shakeLetter={shakeLetter} revealWord={revealWord} shakeWord={shakeWord} />
      <Keyboard handleKeyPress={handleKeyPress} keyStates={keyStates}/>
    </main>
  );
}
