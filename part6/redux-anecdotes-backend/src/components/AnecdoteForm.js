import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const addAnedocte = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(addNotification(`You added ${content} anecdote`, 5))
      }

    return (
        <div>
        <form onSubmit={addAnedocte}>
          <div>
            <input name = 'anecdote'/>
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
}

export default AnecdoteForm