import React, { createContext } from 'react'

import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SongsIndex from './components/song/SongsIndex'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AlbumIndex from './components/album/AlbumIndex'
import ShowAlbum from './components/album/ShowAlbum'
import PlaylistIndex from './components/Playlist/PlaylistIndex'
import ShowPlaylist from './components/Playlist/ShowPlaylist'
import Player from './components/player/Player'
import SongForm from './components/forms/SongForm'
import NewAlbumForm from './components/forms/NewAlbumForm'
import NewPlaylistForm from './components/forms/NewPlaylistForm'
import SecureRoute from './components/common/SecureRoute'
import UserDashboard from './components/dashboard/UserDashboard'

export const AudioQueueContext = createContext(null)


function App() {
  //! Player que list 
  const [audioQueue, setAudioQueue] = React.useState(null)

  const updateAudioQueue = (song, playnow) => {

    if (!audioQueue) {
      setAudioQueue(song)
    } else {
      const filteredSongs = song.filter(song => {
        const hasSong = audioQueue.findIndex(savedSong => savedSong.name === song.name)
        if (hasSong === -1) return true
        return false
      })
      if (playnow) {
        setAudioQueue([...filteredSongs, ...audioQueue])
      } else {
        setAudioQueue([...audioQueue, ...filteredSongs])
      }
    }
  }

  return (
    <>
      <BrowserRouter>
        <AudioQueueContext.Provider value={{ audioQueue, updateAudioQueue }}>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/songs">
              <SongsIndex updateAudioQueue={updateAudioQueue} />
            </Route>
            <SecureRoute exact path="/albums/new">
              <NewAlbumForm />
            </SecureRoute>
            <Route path="/albums/:albumId">
              <ShowAlbum updateAudioQueue={updateAudioQueue} />
            </Route>
            <Route path="/albums" component={AlbumIndex} />
            <SecureRoute exact path="/playlist/new">
              <NewPlaylistForm />
            </SecureRoute>
            <Route path="/playlists/:playlistId" component={ShowPlaylist} />
            <Route path="/playlists" component={PlaylistIndex} />
            <SecureRoute path="/upload-song" component={SongForm} />
            <SecureRoute path="/albums/new" component={NewAlbumForm} />
            <SecureRoute path="/playlist/new" component={NewPlaylistForm} />
            <SecureRoute path="/dashboard" component={UserDashboard} />
          </Switch>
          <Player audioQueue={audioQueue} setAudioQueue={setAudioQueue} />
        </AudioQueueContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App