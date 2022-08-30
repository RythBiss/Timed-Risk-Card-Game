import './App.css';
import React, { useState } from 'react';
import Deck from './Components/Deck';
import Progressbar from './Components/Progressbar';

function App() {

  const [progress, setProgress] = useState(10);

  return (
    <div className="App">
      <Progressbar progress={progress}/>
      <Deck />
    </div>
  );
}

export default App;
