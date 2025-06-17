import React from 'react'

import Nav from './components/Nav.js'
import Home from './components/Home.tsx'
import Login from './components/auth/Login.js'
import Register from './components/auth/Register.js'
import SongsIndex from './components/song/SongsIndex.tsx'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AlbumIndex from './components/album/AlbumIndex.js'
import ShowAlbum from './components/album/ShowAlbum.tsx'
import PlaylistIndex from './components/Playlist/PlaylistIndex.js'
import ShowPlaylist from './components/Playlist/ShowPlaylist.js'
import Player from './components/player/Player.js'
import SongForm from './components/forms/SongForm.js'
import NewAlbumForm from './components/forms/NewAlbumForm.js'
import NewPlaylistForm from './components/forms/NewPlaylistForm.js'
import UserDashboard from './components/dashboard/UserDashboard.js'
import LyricSheet from './components/song/LyricSheet.js'

import SecureRoute from './components/common/SecureRoute.tsx'
import { AudioQueueContext } from 'AudioQueueContext.ts'

import Song from 'types/song'


function App() { 
  //* Player queue list 
  const [audioQueue, setAudioQueue] = React.useState<Song[] | null>([])

  const updateAudioQueue = (songs : Song[] , playnow : boolean) => {

    if (!audioQueue) {
      setAudioQueue(songs)
    } else {
      const filteredSongs = songs.filter(song => {
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
            <Route exact path="/songs" component={SongsIndex}/>
            <SecureRoute exact path="/albums/new" component={NewAlbumForm}/>
            <Route path="/albums/:albumId" component={ShowAlbum}>
            </Route>
            <Route path="/albums" component={AlbumIndex} />
            <SecureRoute exact path="/playlist/new" component={NewPlaylistForm}/>
            <Route path="/songs/:songId/lyrics/:lyricSheetId" component={LyricSheet} />
            {/* TODO: secure routes based on users song/artist based access */}
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