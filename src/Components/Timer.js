import React from 'react'

export default function Timer(props) {

  return (
    <h2 className='timer'>
        Offer expires in {props.time}s.
    </h2>
  )
}