import './Css/Sass.css';
import React, { useEffect, useState } from 'react';
import GameComponent from './Components/Deck';
import Progressbar from './Components/FlipperRoll';
import Timer from './Components/Timer';
import PageCap from './Components/PageCaps';

function App() {

  const [gameOver, setGameOver] = useState(true);
  const [progress, setProgress] = useState(20000);
  const [displayTime, setDisplayTimer] = useState(0);

  //clamps the progress value between 0 and 100
  const addProgressClamped = (num) => {
    const newProgress = num + progress;
    setProgress(Math.min(Math.max(newProgress, 0), 1000000));
  }

  const resetProgress = () => {
    setProgress(20000);
  }

  //sets gameOver to true if the progress bar hits either threshold
  useEffect(() => {
    if(progress >= 1000000 || progress <= 0){
      setGameOver(true);
    }
  }, [progress]);
  

  return (
    <div className="App">
      <PageCap content={'Deck Market'}/>
      <Progressbar progress={progress}/>
      <div className='controls'>
        <GameComponent progress={progress} updateProgress={addProgressClamped} resetProgress={resetProgress} gameOver={gameOver} updateGameOver={setGameOver} updateDisplayTime={setDisplayTimer} />
        <Timer time={displayTime}/>
      </div>
      <PageCap/>
    </div>
  );
}

export default App;