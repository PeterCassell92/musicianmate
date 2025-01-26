import React from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import { getSongLyricSheet } from '../../lib/api'

function LyricSheet() {

  const history = useHistory()
  const { songId, lyricSheetId } = useParams()
  const [lyricsText , setLyricsText] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSongLyricSheet(songId, lyricSheetId)
        setLyricsText(response.data.text)
      } catch (err) {
        console.log(err)
        history.push('./error')
      }
    }
    getData()
  }, [history, songId, lyricSheetId])
  return (
    <div className='container'>
      <h1>lyricSheet</h1>

      <div className='section lyricsBox'>
        { lyricsText }
        {/* TODO: Render lyrics with annotation options */}
      </div>
      <button className="button" onClick={handleClear}>
        Edit Lyrics
      </button>
    </div>
    
  )
}

export default LyricSheet