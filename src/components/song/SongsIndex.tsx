import React from 'react'
import { useHistory } from 'react-router-dom'
import { getAllSongs } from '../../lib/api'
import SongList from './SongList'
import Song from 'types/song'


function SongsIndex() {
  const history = useHistory()
  const [songs, setAllSongs] = React.useState<Array<Song> | undefined >()
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllSongs()
        setAllSongs(response.data)
      } catch (err) {
        console.log(err)
        history.push('./error')
      }
    }
    getData()
  }, [setAllSongs, history])

  
  const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const filteredSongs = songs?.filter((song) => {
    return (
      song.name?.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <>
      <section className="hero">
        <div className="hero-body ">
          <p className="title has-text-light">Search Songs</p>
          <p className="subtitle has-text-light">
            Search through a huge collection of songs
          </p>
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

export default SongsIndex
