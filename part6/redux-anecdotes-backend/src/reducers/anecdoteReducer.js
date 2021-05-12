import anecdoteService from '../services/anecdotes'

export const createAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteFor = id => {
  return async dispatch => {
    const addVote = await anecdoteService.updateVotes(id)
    dispatch({
      type: 'VOTE',
      data: addVote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdotesReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anectode = state.find(n => n.id === id)
      const changedAnectode = {
        ...anectode,
        votes: anectode.votes + 1
      }
      const results = state.map(n => n.id !== id ? n : changedAnectode)
      return results.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default: 
      return state
    }
}


export default anecdotesReducer