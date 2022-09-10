import React, { useEffect } from 'react'
import Flipper from './Flipper';

export default function Progressbar(props) {

  useEffect(() => {
    console.log(props.progress);
    console.log(String(props.progress).padStart(7, '0'));
  }, [props.progress])

  return (
    <div className='flip-display'>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[0]}/>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[1]}/>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[2]}/>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[3]}/>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[4]}/>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[5]}/>
      <Flipper displayValue={String(props.progress).padStart(7, '0')[6]}/>
    </div>
  )
}