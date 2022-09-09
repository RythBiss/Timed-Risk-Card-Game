import React from 'react'
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Flipper(props) {

    const [flip, setFlip] = useState(false);

    const spring = useSpring({
        transform: `perspective(1000px) rotateX(${flip ? -180 : 0}deg)`
      })

    const handleClick = () => {
        if(flip === false){
            setFlip(!flip);
        }
    }

  return (  
      <div className='flip-container' >
        <div className='flipper'  onClick={handleClick}>
          <div className='flip-front'>&</div>    
        </div>
        <div className='flipper static-flipped-down'  onClick={handleClick}>
          <div className='flip-back'/>    
        </div>
        <animated.div className='flipper' style={spring} onClick={handleClick}>
          <div className='flip-front'>{props.displayValue}</div>
          <div className='flip-back'/>    
        </animated.div>
      </div>
  )
}
/*
to-do:
    ✓ 1) when flipped down, number on the front is not rendered.
    2) a second card is loaded behind the first with the next number to be rendered.
    3) look into spring transitions: animate the mounting and unmounting of each new number.
    4) when a number is updated, the flipper should quickly cycle through each number in between the old and new number.
*/