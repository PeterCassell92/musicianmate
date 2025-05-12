import React, { useState } from 'react'

function LyricEditor({ onClose, lyrics, songId }) {

  const save = () => {
    console.info(`TODO: Send lyrics to server to be stored against ${songId}`)
  }

  const [editableLyrics, setEditableLyrics ] = useState(lyrics)
  const handleLyricChange = (e)=> {
    setEditableLyrics(e.target.value)
  }
  return (
    <div className='lyric-editor'>
      <h2>Edit Lyrics</h2>
      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea className="textarea" placeholder="Edit your lyrics here" value={editableLyrics} onChange={handleLyricChange}></textarea>
        </div>
      </div>
      <button className='button' onClick={ onClose } >
        Close
      </button>
      <button className='button' onClick={save}>
        Save
      </button>
    </div>
  )
}

export default LyricEditor