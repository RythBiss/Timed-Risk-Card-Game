import React from 'react'

export default function Progressbar(props) {

  document.documentElement.style.setProperty('--progress', `${props.progress}%`);

  return (
    <div id='progress-bar' >
      Progress Bar: {props.progress}/100
      <div id='bar-fill'></div>
    </div>
  )
}
