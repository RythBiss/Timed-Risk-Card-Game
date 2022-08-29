import React, { useEffect, useState } from 'react'

export default function Deck() {

  let jsDeck = [8,6,7,6,4,9,2,5,8]

  const [deckPos, setDeckPos] = useState(0);

  const draw = () => {
    setDeckPos(deckPos + 1);
  }

  return (
    <>
      <button onClick={draw}>add</button>
      <h1>Deck position: {jsDeck[deckPos]}</h1>
    </>
  )
}