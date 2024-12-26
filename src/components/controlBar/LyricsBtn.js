import React, { useEffect } from 'react'

const LyricsButton = () => {
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      console.log('Go To Lyrics - Stub')
      //TODO: Go to most recently versioned / officialised lyrics
    } catch (err) {
      console.log(err.res)   
    }
  }
  return (
    <a
      className = "button is-primary"
      onClick ={handleClick}
    >
        Lyrics Button Placeholder
    </a>
  )
}

export default LyricsButton