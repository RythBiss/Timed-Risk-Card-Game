import React, { useEffect, useState } from 'react'
import { useSpring, a } from 'react-spring';

export default function Timer(props) {

  const [time, set] = useState(0);

  const animateTime = useSpring({
    strokeDashoffset: `${((time/2) * 113) - 113}px`,
    config: {duration: 1000}
  })

  useEffect(() => {
    if(props.gameOver === false){
      set(props.time);
    }else{
      set(0);
    }
  }, [props.time])

  return (
    <div className='timer'>
      <svg className='timer-dial'>
        <circle fill='#E2DCDE' r="36" cx="36" cy="36"></circle>
        <circle fill='#474448' r="32" cx="36" cy="36"></circle>
        <a.circle className='dial' r="15" cx="36" cy="36" style={animateTime}></a.circle>
      </svg>
    </div>
  )
}