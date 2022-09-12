import React from 'react'

export default function Header(props) {
  return (
    <div className='caps'>
      {
      props.content ? 

      <h1 className='cap-text'>
        {props.content}
      </h1>

      :
      
      <></>
      }
    </div>
  )
}