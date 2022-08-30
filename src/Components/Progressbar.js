import React from 'react'

export default function Progressbar(props) {

  document.documentElement.style.setProperty('--progress', `${props.progress}%`);

  return (
    <div id='progress-bar' >
        Progressbar
        <div id='bar-fill'></div>
        </div>
  )
}
