import React, { useState } from 'react'
import Loader from 'react-loader-spinner'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import { getSongLyricSheet } from '../../lib/api'
import LyricEditor from './LyricEditor'

function LyricSheet() {

  const history = useHistory()
  const { songId, lyricSheetId } = useParams()
  const [lyricsText , setLyricsText] = useState(null)
  const [ lyricEditorOpen, setLyricEditorOpen ] = useState(false)

  const onLyricEditorClose = () => setLyricEditorOpen(false)


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
      { lyricsText ?
        lyricEditorOpen ?
          <>
            <div className='section lyricsBox'>
              { lyricsText }
              {/* TODO: Render lyrics with annotation options */}
            </div>
            <button className="button" onClick={()=> setLyricEditorOpen(true)}>
              Edit Lyrics
            </button>
          </>
          : <LyricEditor onClose={onLyricEditorClose} lyrics={lyricsText} songId={songId}/> :
        <div id="loader">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={150}
            width={150}
            timeout={3000} //3 secs
          />
        </div>
      }
    </div>
  )
}

export default LyricSheet