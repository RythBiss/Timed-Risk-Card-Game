import React, { useEffect, useState } from 'react'

export default function Deck(props) {

  const updateProgress = props.updateProgress;

  const [deck, setDeck] = useState([0.05,0.10,0.15,0.20,0.25,0.30,0.35,0.40,0.45,0.50,0.55,0.60,0.65,0.70,0.75,0.80,0.85,0.90,0.95]);
  const [deckPos, setDeckPos] = useState(0);

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
    const roll = Math.random();

    console.log(`Success if ${roll} is lower than ${success}`)

    if(roll < success){
      console.log('Success');
      return true;
    }else{
      console.log('Failed...');
      return false;
    }
  }

  //called when player takes the risk, returns either +10 or - 10
  const takeRisk = () => {
    const result = rollResults(deck[deckPos]);

    if(result){
      updateProgress(10);
    }else{
      updateProgress(-10);
    }

    draw();
  }

  //called when player passes the risk, returns a predictable loss of -5
  const takeLoss = () => {
    updateProgress(-5);

    draw();
  }

  //shuffles deck on start
  useEffect(() => {
    shuffleDeckHook();
  }, []);

  return (
    <>
      <h1>Deck position: {deck[deckPos] * 100}%</h1>
      <button onClick={takeRisk}>Accept Risk</button>
      <button onClick={takeLoss}>Pass</button>
    </>
  )
}