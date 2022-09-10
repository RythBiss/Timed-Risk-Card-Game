import React from 'react'
import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Flipper(props) {

  const [flip, setFlip] = useState(false);
  const [oldNumber, setOldNumber] = useState(0);
  const [newNumber, setNewNumber] = useState(0);
  const [skipFlip, setSkipFlip] = useState(false);
  const [carryOverNumber, setCarryOverNumber] = useState(0);

  const spring = useSpring({
    transform: `perspective(5000px) rotateX(${flip ? 0 : -180}deg)`,
    onRest: {
      transform: () => {reloadFlipper()}
    },
    immediate: skipFlip,
    config: {mass: 3, tension: 250}
  })

  const reloadFlipper = () => {
    console.log('flip')
    setSkipFlip(false);
    setFlip(false);
    setCarryOverNumber(props.displayValue);
    setNewNumber(props.displayValue);
  }

  const prepareFlipper = () => {
    setSkipFlip(true);
      setFlip(true);
      setOldNumber(carryOverNumber);
  }

  useEffect(() => {
    prepareFlipper()
  }, [props.displayValue]);
  

  return (  
      <div className='flip-container' >
        <div className='flipper'>
          <div className='flip-front'>{newNumber}</div>    
        </div>
        <div className='flipper static-flipped-down'>
          <div className='flip-back'/>    
        </div>
        <animated.div className='flipper' style={spring}>
          <div className='flip-front'>{oldNumber}</div>
          <div className='flip-back'/>    
        </animated.div>
      </div>
  )
}
/*
to-do:
    ✓ 1) when flipped down, number on the front is not rendered.
    ✓ 2) a second card is loaded behind the first with the next number to be rendered.
    3) when a number is updated, the flipper should quickly cycle through each number in between the old and new number.
*/