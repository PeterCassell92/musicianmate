import React from 'react'
import SongComment from '../comment/SongComment'
import ControlBar from '../controlBar/ControlBar'
import PlayBtn from '../controlBar/PlayBtn'
import PlaylistBtn from '../controlBar/PlaylistBtn'
import LikeBtn from '../controlBar/LikeBtn'
import LyricsBtn from '../controlBar/LyricsBtn'
import { isOwner } from '../../lib/auth'
import { editSong } from '../../lib/api'

function SongListItem(props) {
  const [commentHidden, setCommentHidden] = React.useState(false)

  const handleCommentExpand = () => {
    setCommentHidden(!commentHidden)
  }

  const [shadowDeleted, setShadowDeleted] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)

  const handleShadowDelete = async () => {
    setShadowDeleted(!shadowDeleted)
    try {
      await editSong(props._id, { ...props, isDeleted: true })
      setOpenModal(false)
    } catch (e) {
      console.log(e?.response.data)
    }
  }
  const handleConfirm = () => {
    handleShadowDelete()
  }

  const handleReject = () => {
    setOpenModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  return (
    <>
      {!shadowDeleted && (
        <div id="song-item" className="box">
          <div className="media" key={props._id}>
            <figure className="media-left">
              <p className="image is-128x128">
                <img src={props.cover} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong id="song-title" className="title has-text-light">
                    {props.name}
                  </strong>
                </p>
                <p>
                  <small className="subtitle has-text-grey">
                    Artist: {props.singer.name}
                  </small>
                </p>
                <p>
                  <small className="subtitle has-text-grey">
                    Genre: {props.genre}
                  </small>
                </p>
                <p>
                  <small className="subtitle has-text-grey">
                    Album: {props.album.name}
                  </small>
                </p>
              </div>
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <div className="buttons">
                      <button
                        className="button is-info"
                        onClick={handleCommentExpand}
                      >
                        Comments
                      </button>
                    </div>
                  </div>
                  <div className="level-right">
                    <ControlBar>
                      <PlaylistBtn {...props} />
                      <PlayBtn {...props} />
                      <LikeBtn
                        id={props._id}
                        type="Song"
                        likesCount={props.likesCount}
                      />
                      <LyricsBtn/>
                    </ControlBar>
                  </div>
                </div>
              </div>

              {commentHidden && (
                <div className="box">
                  <SongComment commentsPassed={props.comments} id={props._id} />
                </div>
              )}
            </div>
            <div className="field has-addons">
              <div className="media-right">
                {isOwner(props.user) && (
                  <span>
                    <button
                      onClick={handleOpenModal}
                      id="delete-song-button"
                      className="button is-danger"
                    >🗑</button>
                  </span>
                )}
                <div className={`modal ${openModal && 'is-active'}`}>
                  <div className="modal-background" onClick={handleReject}></div>
                  <div className="modal-content">
                    <div className="box">
                      <label className="label has-text-centered">Are you sure you want to delete this song?</label>
                      <br />
                      <div className="buttons is-centered">
                        <button className="button is-danger" onClick={handleConfirm}>Yes</button>
                        <button className="button is-warning" onClick={handleReject}>No</button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleReject}
                    className="modal-close is-large"
                    aria-label="close"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  )
}

export default SongListItem
