import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { addCommentToSong, deleteCommentInSong, editCommentInSong, getCommentsForSong } from '../../lib/api'
import { isAuthenticated, isOwner } from '../../lib/auth'
import useForm from '../../hooks/useForm'
import Comment from 'types/comment'


type SongCommentProps = {
  id: string // the song id
}

function SongComment({ id } : SongCommentProps) {
  const history = useHistory()
  const [comments, setAllComments] = React.useState<Comment[] | null>(null)
  const [submit, setSubmit] = React.useState(false)
  const [commentEdit, setCommentEdit] = React.useState(false)
  const [currentCommentId, setCurrentCommentId] = React.useState('')

  const { formdata, handleChange } = useForm({
    text: '',
  })

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getCommentsForSong(id)
        const reversedArray = response.data.reverse()
        setAllComments(reversedArray)

      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data)
        } else {
          console.error('Unknown error', err)
        }
        history.push('./error')
      }
    }
    getData()
  }, [submit, history, id])

  const handleAddComment = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await addCommentToSong(formdata, id)
      setSubmit(!submit)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data)
      } else {
        console.error('Unknown error', err)
      }
    }
  }

  const editComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCommentEdit(true)
    const target = event.target as HTMLButtonElement
    const commentId = target.value.split('-')[0]
    const text = target.value.split('-')[1]

    formdata.text = text
    setSubmit(!submit)
    setCurrentCommentId(commentId)
  }

  const handleEditComment = async (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      await editCommentInSong(formdata, id, currentCommentId)
      formdata.text = ''
      setSubmit(!submit)

    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data)
      } else {
        console.error('Unknown error', err)
      }
    }
  }

  const handleDeleteComment = async (event : React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement
    const commentId = target.value
    try {
      await deleteCommentInSong(id, commentId)
      setSubmit(!submit)

    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data)
      } else {
        console.error('Unknown error', err)
      }
    }
  }
  
  return (
    <>
      <div id="comments-scroll">
        {comments && comments.map(comment => (
          <div key={comment._id} className="box is-primary">
            <p>{comment.user.username}</p>
            <p>{comment.text}</p>
            {isOwner(comment.user._id) &&
              <span>
                <button type="button" value={`${comment._id}-${comment.text}`} onClick={editComment}>Edit</button>
                <button type="button" value={comment._id} onClick={handleDeleteComment}>Delete</button>
              </span>
            }
          </div>
        ))}
      </div>
      <div>
      </div>
      {isAuthenticated() &&
        <section id="add-comment">
          <div className="columns is-mobile">
            <div className="column box">
              <form className="form" onSubmit={handleAddComment}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="input"
                      placeholder="Add a comment"
                      name="text"
                      value={formdata.text}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  {!commentEdit ?
                    <button type="submit" className="button is-link">Add Comment</button>
                    : <button type="button" onClick={handleEditComment} className="button is-warning">Edit Comment</button>
                  }
                </div>
              </form>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default SongComment