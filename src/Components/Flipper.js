import React from 'react'
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Flipper(props) {

    const [flip, setFlip] = useState(false);

    const spring = useSpring({
        config: { duration: 300 },
        transform: flip ? 'rotate3d(1, 0, 0, 180deg)' : 'rotate3d(1, 0, 0, 0deg)'
    })

    const handleClick = () => {
        setFlip(!flip);
    }

  return (
    <animated.div style={spring} onClick={handleClick}>
        <div>{props.displayValue}</div>
    </animated.div>
  )
}
