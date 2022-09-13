import React from 'react'
import Flipper from './Flipper';
import { useSpring, a } from 'react-spring';

export default function Progressbar(props) {

  const spring = useSpring({
    backgroundColor: `${props.progress >= 1000000 ? '#ebc944' : '#787479'}`,
    config: {duration: 250}
  })

  const textSpring = useSpring({
    color: `${props.progress >= 1000000 ? '#474448' : '#E2DCDE'}`,
    config: {duration: 250}
  })

  return (
    <a.div className='flip-display' style={spring}>
      <a.p style={textSpring}>$</a.p>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[0]}/>
      <a.p style={textSpring} className='comma'>,</a.p>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[1]}/>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[2]}/>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[3]}/>
      <a.p style={textSpring} className='comma'>,</a.p>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[4]}/>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[5]}/>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[6]}/>
    </a.div>
  )
}