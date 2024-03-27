'use client';

import styles from "./page.module.css";
import { useEffect,  useState } from "react";
import Keyboard from "./components/keyboard";
import Header from "./components/header";
import WordleBoard from "./components/wordleboard";
import GameOverModal from "./components/gameovermodal";
import { useGame } from "./hooks/useGame";
import GameWarning from "./components/gamewarning";

export default function Main() {
  const {restartGame, guesses, handleKeyPress, revealWord, gameOver, shakeWord, shakeLetter, msg, word, error, setError} = useGame();

  console.log(guesses);
  ///listens to the users keyboard inputs
  useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });
  
  useEffect(() => {
    restartGame();
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      {gameOver && (
        <GameOverModal onClose={()=>restartGame()} open={gameOver} msg={msg} />
      )}
      
      {word && (
        <>
          <GameWarning error={error} setError={setError} />
          <WordleBoard
            gameOver={gameOver} 
            guesses={guesses} 
            shakeLetter={shakeLetter} 
            revealWord={revealWord} 
            shakeWord={shakeWord}
            />
          <Keyboard handleKeyPress={handleKeyPress} guesses={guesses}/>
        </>
      )}
    </main>
  );
}
