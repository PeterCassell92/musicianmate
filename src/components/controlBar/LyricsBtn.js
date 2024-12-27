import React from 'react'
import { Link } from 'react-router-dom'

const LyricsButton = ({ songId, lyricSheetId }) => {
  //TODO: allow for navigation to other lyric versions.
  return (
    <Link
      to={`/songs/${songId}/lyrics/${lyricSheetId}`}
      className = "button is-primary"
    >
        Lyrics Button Placeholder
    </Link>
  )
}

export default LyricsButton