import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdotesReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then(anecdotes => 
    store.dispatch(initializeAnecdotes(anecdotes)))

export default store