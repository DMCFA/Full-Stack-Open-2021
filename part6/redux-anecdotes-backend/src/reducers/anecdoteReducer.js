const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: asObject(content)
  }
}

export const voteFor = (id) => {
  return {
  type: 'VOTE',
  data: {id}
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
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