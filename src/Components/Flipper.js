import React from 'react'
import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Flipper(props) {

  const [flip, setFlip] = useState(false);
  const [oldDisplay, setOld] = useState(0);
  const [newDisplay, setNew] = useState(0);
  const [showFlip, setShowFlip] = useState(false);
  const [carryNum, setNum] = useState(0);

  const spring = useSpring({
    transform: `perspective(1000px) rotateX(${flip ? 0 : -180}deg)`,
    onRest: {
      transform: () => {reloadFlipper()}
    },
    immediate: showFlip
  })

  const reloadFlipper = () => {
    setShowFlip(false);
    setFlip(false);

    setNum(props.displayValue);
    setNew(props.displayValue);
  }

  useEffect(() => {

      setShowFlip(true);
      setFlip(true);
      setOld(carryNum);
  }, [props.displayValue]);
  

  return (  
      <div className='flip-container' >
        <div className='flipper'>
          <div className='flip-front'>{newDisplay}</div>    
        </div>
        <div className='flipper static-flipped-down'>
          <div className='flip-back'/>    
        </div>
        <animated.div className='flipper' style={spring}>
          <div className='flip-front'>{oldDisplay}</div>
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