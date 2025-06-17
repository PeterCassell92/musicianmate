import React from 'react'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { deleteAlbum, getSingleAlbum } from '../../lib/api'
import { isOwner } from '../../lib/auth'
import Error from '../common/Error'
import SongList from '../song/SongList'
import axios from 'axios'
import { useAudioQueue } from 'AudioQueueContext'
import Album from 'types/album'

type Params = {
  albumId: string
}

function ShowAlbum() {
  const history = useHistory()
  const { albumId } = useParams<Params>()
  const [album, setAlbum] = React.useState<Album>()
  const [isError, setIsError] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')

  const { updateAudioQueue } = useAudioQueue()
  

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSingleAlbum(albumId)
        console.log(response.data)
        setAlbum(response.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getData()
  }, [albumId])

  if (!albumId) {
    return <Redirect to="/albums" />
  }

  const filteredSongs = album?.songs.filter((song) => {
    return song.name.toLowerCase().includes(searchTerm)
  })

  const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const handleRemoveAlbum = async () => {
    try {
      await deleteAlbum(albumId)
      history.push('/albums')

    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data)
      } else {
        console.error('Unexpected error:', err)
      }
    }
  }

  const handlePlayAlbum = async () => {
    try {
      if (album?.songs) {
        updateAudioQueue(album.songs, true) // Could use album! the non-null assertion operator here
      } else {
        console.warn('No songs found in album.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section id="album-show">
        <div className="columns">
          <div className="hero-body">
            <p className="title has-text-light">{album?.name}</p>
            <p className="subtitle has-text-light">{album?.artists && (
              album.artists.map(artist => <span key={artist._id}>{artist.name} </span>)
            )}</p>
            <div className="field is-grouped">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Search by song name"
                  onChange={handleInput}
                  value={searchTerm}
                />
              </div>
              <div className="control">
                <button className="button" onClick={handleClear}>
                  Clear
                </button>
              </div>
            </div>
          </div>
          {isOwner(album?.user) &&
            <aside id="aside" className="column">
              <button className="button remove-album-btn" onClick={handleRemoveAlbum}>Delete Album</button>
            </aside>
          }
          <aside className="column">
            <button className="button play-album-btn" onClick={handlePlayAlbum}>Play Album</button>
          </aside>

        </div>
      </section>
      {isError && <Error />}
      <SongList songList={filteredSongs} />
    </>
  )
}

export default ShowAlbum
