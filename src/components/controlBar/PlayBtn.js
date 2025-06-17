import React from 'react'
import { useAudioQueue } from '../../AudioQueueContext'

function PlayBtn(props) {
  const { updateAudioQueue } = useAudioQueue()
  const handleClick = () => {
    const song = {
      name: props.name,
      singer: props.singer.name,
      cover: props.cover,
      musicSrc: props.musicSrc,
    }
    updateAudioQueue([song], true)
  }

  return (
    <button className="button" onClick={handleClick}>▶️</button>
  )
}

export default PlayBtn