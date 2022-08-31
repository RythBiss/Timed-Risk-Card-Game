import React from 'react'

export default function Timer(props) {

  return (
    <h2>
        Offer expires in {props.time}s (-{props.lossPenalty}).
    </h2>
  )
}