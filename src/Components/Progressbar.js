import React from 'react'

export default function Progressbar(props) {

  document.documentElement.style.setProperty('--progress', `${props.progress}%`);

  return (
      <div className='progress-bar' >
        Progress Bar: {props.progress}/100
        <div className='flip-display'>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>

        </div>
      </div>
  )
}