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
      const changedAnecdote = state.map((anecdote) =>
      anecdote.id !== action.data.id
      ? anecdote
      : {
        ...anecdote,
        votes: anecdote.votes + 1
      })
      return changedAnecdote.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
    default: 
      return state
    }
}


export default anecdotesReducer