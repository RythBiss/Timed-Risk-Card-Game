import './Css/Sass.css';
import React, { useEffect, useState } from 'react';
import GameComponent from './Components/Deck';
import FlipperRoll from './Components/FlipperRoll';
import Timer from './Components/Timer';
import PageCap from './Components/PageCaps';
import Instructions from './Components/Instructions';

function App() {
  const [gameOver, setGameOver] = useState(true);
  const [progress, setProgress] = useState(50000);
  const [displayTime, setDisplayTimer] = useState(0);

  //clamps the progress value between 0 and 100
  const addProgressClamped = (num) => {
    const newProgress = num + progress;
    setProgress(Math.round(Math.min(Math.max(newProgress, 0), 1000000)));
  }

  const resetProgress = () => {
    setProgress(50000);
  }

  //sets gameOver to true if the progress bar hits either threshold
  useEffect(() => {
    if(progress >= 1000000 || progress <= 0) setGameOver(true);
  }, [progress]);
  

  return (
    <div className="App">
      <PageCap content={'Deck Market'}/>
      <Instructions />
      <div className='controls'>
        <FlipperRoll progress={progress}/>
        <GameComponent progress={progress} updateProgress={addProgressClamped} resetProgress={resetProgress} gameOver={gameOver} updateGameOver={setGameOver} updateDisplayTime={setDisplayTimer} />
        <Timer time={displayTime} gameOver={gameOver}/>
      </div>
      <PageCap />
    </div>
  );
}

export default App;