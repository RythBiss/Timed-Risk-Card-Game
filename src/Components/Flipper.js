import React from 'react'
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Flipper(props) {

    const [flip, setFlip] = useState(false);

    const spring = useSpring({
        config: { mass: 5, tension: 750, friction: 40 },
        transform: flip ? 'rotate3d(1, 0, 0, 180deg)' : 'rotate3d(1, 0, 0, 0deg)'
    })

    const handleClick = () => {
        if(flip === false){
            setFlip(!flip);
        }
    }

  return (
    <animated.div style={spring} onClick={handleClick}>
        <div>{props.displayValue}</div>
    </animated.div>
  )
}

/*
to-do:

1) when flipped down, number on the front is not rendered.
2) a second card is loaded behind the first with the next number to be rendered.
3) look into spring transitions: animate the mounting and unmounting of each new number.
4) when a number is updated, the flipper should quickly cycle through each number in between the old and new number.
*/