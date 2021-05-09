import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteFor(id))
      }

    return(
        <div>
        <h2>Anecdotes</h2>
        {anecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                vote(anecdote.id)
                dispatch(addNotification(`you voted for ${anecdote.content} anecdote`))
                setTimeout(() => dispatch(addNotification(null)),5000)}
              }>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        </div>
    )
}

export default AnecdoteList