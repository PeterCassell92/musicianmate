import React from 'react'
import SongList from '../song/SongList'
import Error from '../common/Error'
import { useHistory } from 'react-router-dom'
import { getAllSongs } from '../../lib/api'
import { isOwner } from '../../lib/auth'

function UserSongs() {
  const history = useHistory()
  const [songs, setAllSongs] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllSongs()
        setAllSongs(response.data)
        
      } catch (err) {
        <>
          <Error />
        </>
      }
    }
    getData()
  }, [setAllSongs, history])


  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const filteredSongs = songs?.filter((song) => {
    return song.name.toLowerCase().includes(searchTerm) && isOwner(song.user)
  })

  return (
    <>
      <section className="hero is-primary is-small">
        <div className="hero-body">
          <p className="title">My Songs</p>
          <p className="subtitle">Search through a huge collection of songs</p>
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
      </section>
      <SongList songList={filteredSongs} />
    </>
  )
}

export default UserSongs
