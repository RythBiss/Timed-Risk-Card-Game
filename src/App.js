import './App.css';
import React, { useEffect, useState } from 'react';
import Deck from './Components/Deck';
import Progressbar from './Components/Progressbar';

function App() {

  const [gameOver, setGameOver] = useState(true);
  const [progress, setProgress] = useState(20);

  const setProgressClamped = (num) => {
    const newProgress = num + progress;
    setProgress(Math.min(Math.max(newProgress, 0), 100));
  }

  useEffect(() => {
    if(progress >= 100){
      setGameOver(true);
    }else if(progress <= 0){
      setGameOver(true);
    }
  }, [progress]);

  return (
    <div className="App">
      <Progressbar progress={progress}/>
      <Deck progress={progress} updateProgress={setProgressClamped} gameOver={gameOver} updateGameOver={setGameOver}/>
    </div>
  );
}

export default App;