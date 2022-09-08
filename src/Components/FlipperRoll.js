import React from 'react'
import Flipper from './Flipper';

export default function Progressbar(props) {

  const getDisplayValue = (pos) => {
    return String(props.progress).padStart(7, '0')[pos];
  }

  return (
      <div className='progress-bar' >
        <div className='flip-display'>
          <Flipper displayValue={getDisplayValue(0)}/>
          <Flipper displayValue={getDisplayValue(1)}/>
          <Flipper displayValue={getDisplayValue(2)}/>
          <Flipper displayValue={getDisplayValue(3)}/>
          <Flipper displayValue={getDisplayValue(4)}/>
          <Flipper displayValue={getDisplayValue(5)}/>
          <Flipper displayValue={getDisplayValue(6)}/>
        </div>
      </div>
  )
}