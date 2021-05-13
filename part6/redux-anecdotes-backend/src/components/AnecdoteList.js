import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    
    const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => (a.votes > b.votes) ? -1 : 1)
    })


    const vote = (anecdote) => {
        dispatch(voteFor(anecdote.id))
        dispatch(addNotification(`you voted for ${anecdote.content}`, 5))
      }      

    return(
        <div>
        {anecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                vote(anecdote)
                }
              }>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        </div>
    )
}

export default AnecdoteList