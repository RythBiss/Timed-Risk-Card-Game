import React, { useEffect, useRef, useState } from 'react'

export default function Deck(props) {

  const lossPenalty = 10000;
  const maxBank = 1000000;
  const updateProgress = props.updateProgress;

  const [deck, setDeck] = useState([0.05,0.10,0.15,0.20,0.25,0.30,0.35,0.40,0.45,0.50,0.55,0.60,0.65,0.70,0.75,0.80,0.85,0.90,0.95]);
  const [deckPos, setDeckPos] = useState(0);
  const [time, setTime] = useState(3);

  const timerRef = useRef(null);

  //increment position in deck by 1. If the last card is reached, shuffle and reset position to 0.
  const draw = () => {
    if((deckPos + 1) < (deck.length)){
      setDeckPos(deckPos + 1);
    }else{
      shuffleDeckHook();
      setDeckPos(0);
    }
  }

  //called when its time to shuffle instead of calling shuffle directly
  const shuffleDeckHook = () => {
    setDeck(shuffle([...deck]));
  }

  //shuffle the passed array and return it
  const shuffle = (array) => {
    const length = array.length;
    let randomIndex = null;
    let tempArrayStorage = null;

    for(let i = 0; i < length; i++){
      //pick random index ahead of current one
      const min = Math.ceil(i);
      const max = Math.floor(length-1);
      randomIndex = Math.floor(Math.random() * (max - min) + min); 

      //switch current and random index's content
      tempArrayStorage = array[randomIndex];
      array[randomIndex] = array[i];
      array[i] = tempArrayStorage;
    }

    return array;
  }

  //returns a success/fail result based on the percent chance passed
  const rollResults = (success) => {
    const roll = (100 * Math.random());

    if(roll < success) return true;

    return false;
  }

  //called when player takes the risk, returns the bet as a win or loss.
  const takeRisk = () => {
    if(checkGameOver() === false){
      const result = rollResults(getCurrentCard());

      //decides if the wager is gained or lost
      if(result){
        updateProgress(getCurrentWager());
      }else{
        updateProgress(-getCurrentWager());
      }

      draw();
      resetTime();
    }
  }

  //called when player passes the risk, returns a predictable loss of -5
  const takeLoss = () => {
    updateProgress(-lossPenalty);
    draw();
    resetTime();
  }

  //called to easily get the current card's success rate
  const getCurrentCard = () => {
    return parseInt(deck[deckPos] * 100);
  }

  //called to easily get the current wager on the card
  const getCurrentWager = () => {
    return ((maxBank - (10000 * getCurrentCard())) / 2);
  }

  //checks is the game has ended and calls stopGame if it is true
  const checkGameOver = () => {
    if(props.gameOver === true) stopGame();
    return props.gameOver;
  }

  //effectively stops the game
  const stopGame = () => {
    setTime(0);
    clearInterval(timerRef.current);
  }

  //effectively restarts the game
  const resetGame = () => {
    if(checkGameOver() === true){
      props.updateGameOver(false);
      resetTime();
      props.resetProgress();
    }
  }

  //called on timer interval, resets at 3 seconds
  const incrementTime = () => {
    if(checkGameOver() === false){
      if(time > 1){
          setTime(time - 1); 
      }else{
          takeLoss();
          resetTime();
      }
    }
  }

  //quickly reset timer
  const resetTime = () => {
    setTime(3);
  }

  //shuffles deck on start
  useEffect(() => {
    shuffleDeckHook();
  }, []);

  //initiate timer on start and restart
  useEffect(() => {   
    props.updateDisplayTime(time);

    if(!checkGameOver()){
      const timer = setInterval(incrementTime, 1000);
      timerRef.current = timer;
          
    return () => clearInterval(timer);}
  }, [time]);

  //watches for the gameOver prop and calls the gameOver function when it is true.
  useEffect(() => {
    checkGameOver();
  }, [props.gameOver]);

  return (
    <div className='deck-container'>
      <button className='card' onClick={takeRisk}>
        <h1>Odds are {getCurrentCard()}%.</h1>
        <h1>Wager {getCurrentWager()} points<br/>OR<br/>Lose {lossPenalty}.</h1>
      </button>
      <button className='start-button' onClick={resetGame}>
        <h1>
          Start Game
        </h1>
      </button>
    </div>
  )
}