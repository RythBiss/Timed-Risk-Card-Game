import React, { useEffect, useRef, useState } from 'react'

export default function Deck() {

  //finish creating card class
  class card {
    constructor(success, fail){
      this.success = 50;
      this.fail = 50;
    }
  }

  const [deck, setDeck] = useState([0,1,2,3,4,5,6,7,8,9]);
  const [deckPos, setDeckPos] = useState(0);

  const draw = () => {
    setDeckPos(deckPos + 1);
  }

  const shuffle = (array) => {
    const length = array.length;
    let randomIndex = null;
    let tempArrayStorage = null;

    console.log(`array before ${array}`);

    for(let i = 0; i < length; i++){
      //pick random index ahead of current one
      const min = Math.ceil(i);
      const max = Math.floor(length-1);
      randomIndex = Math.floor(Math.random() * (max - min) + min); 
      console.log(randomIndex);

      //switch current and random index's content
      tempArrayStorage = array[randomIndex];
      array[randomIndex] = array[i];
      array[i] = tempArrayStorage;
    }

    return array;
  }
  

  return (
    <>
      <button onClick={() => {setDeck(shuffle([...deck]))}}>shuffle</button>
      <button onClick={draw}>draw</button>
      <h1>Deck position: {deck[deckPos]}</h1>
      <p>{deck}</p>
    </>
  )
}