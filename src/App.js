import './App.css';
import React, { useEffect, useState } from 'react';
import Deck from './Components/Deck';
import Progressbar from './Components/Progressbar';

function App() {

  const [progress, setProgress] = useState(10);

  const setProgressClamped = (num) => {
    const newProgress = num + progress;
    setProgress(Math.min(Math.max(newProgress, 0), 100));
  }

  useEffect(() => {
    console.log(`progress: ${progress}`)
    if(progress >= 100){
      console.log('You won!');
    }else if(progress <= 0){
      console.log('You lost...');
    }
  }, [progress]);

  return (
    <div className="App">
      <Progressbar progress={progress}/>
      <Deck updateProgress={setProgressClamped}/>
    </div>
  );
}

export default App;
