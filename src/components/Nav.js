import React from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken, removeLikes } from '../lib/auth'

function Nav() {
  const location = useLocation()
  const history = useHistory()
  const isLoggedIn = isAuthenticated()
  const [menuIsActive, setMenuIsActive] = React.useState(false)

  const toggleMenu = () => {
    setMenuIsActive(!menuIsActive)
  }

  const handleLogout = () => {
    removeToken()
    removeLikes()
    history.push('/')
  }

  React.useEffect(() => {
    setMenuIsActive(false)
  }, [location.pathname])

  return (
    <nav id="nav" className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            {' '}
            🎶 {' '}Cloudify
          </Link>
          <span
            className={`navbar-burger ${menuIsActive ? 'is-active' : ''} `}
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>
        <div className={`navbar-menu ${menuIsActive ? 'is-active' : ''} `}>
          <div className="navbar-start">
            <Link to="/songs" className="navbar-item">
              {' '}
              Songs
            </Link>
            <Link to="/albums" className="navbar-item">
              {' '}
              Albums
            </Link>
            <Link to="/playlists" className="navbar-item">
              {' '}
              Playlists
            </Link>
            {isAuthenticated() &&
              <>
                <Link to="/upload-song" className="navbar-item">
                  {' '}
                  Upload Song
                </Link>
                <Link to="/albums/new" className="navbar-item">
                  {' '}
                  Create Album
                </Link>
                <Link to="/playlist/new" className="navbar-item">
                  {' '}
                  Create Playlist
                </Link>
              </>
            }
          </div>{' '}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {!isLoggedIn ? (
                  <>
                    <Link to="/register" className="button is-warning">
                      Register
                    </Link>
                    <Link to="/login" className="button is-warning">
                      Log In
                    </Link>
                  </>
                ) : (
                  <button className="button is-warning" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
