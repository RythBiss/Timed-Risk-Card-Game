import React from 'react'

export default function Timer(props) {

  return (
    <div className='timer'>
        <h2 className='timer-num'>{props.time}</h2>
    </div>
  )
}