import React, { useEffect, useRef, useState } from 'react'
import Timer from './Timer';

export default function Deck(props) {

  const lossPenalty = 10;
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

    console.log(`Success if ${roll} is lower than ${success}`)

    if(roll < success){
      console.log('Success');
      return true;
    }else{
      console.log('Failed...');
      return false;
    }
  }

  //called when player takes the risk, returns the bet as a win or loss.
  const takeRisk = () => {
    if(checkGameOver() === false){
      const result = rollResults(getCurrentCard());

      //make reward higher for higher risks, and more punishing for losing those risks
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

  const getCurrentWager = () => {
    return ((100 - getCurrentCard()) / 2);
  }

  const checkGameOver = () => {
    if(props.gameOver === true){
      console.log('Game Over!');
      stopGame();
    }else{
      console.log('Game is still on!');
    }
    return props.gameOver;
  }

  const stopGame = () => {
    setTime(0);
    clearInterval(timerRef.current);
  }

  const resetGame = () => {
    if(checkGameOver() === true){
      props.updateGameOver(false);
      resetTime();
      if(props.progress !==  20){
        updateProgress(-100);
        updateProgress(20);
      }
    }
  }
//----------------------------------------------- Look at moving time related functions to the timer.
  //called on timer interval, resets at 3 seconds
  const incrementTime = () => {
    console.log(checkGameOver());
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
    <>
      <h1>Odds are {getCurrentCard()}%.</h1>
      <h1>Wager is {getCurrentWager()}.</h1>
      <button onClick={takeRisk}>Accept Risk</button>
      <Timer onTimeEnd={takeLoss} time={time} lossPenalty={lossPenalty}/>
      <button onClick={resetGame}>Start Game</button>
    </>
  )
}