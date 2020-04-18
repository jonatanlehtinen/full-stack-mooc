import anecdoteService from "../services/anecdotes"


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.anecdotes
    case 'UPDATE_ANECDOTE':
      const filtered = state.filter(anecdote => anecdote.id !== action.updated.id)
      return [...filtered, action.updated]
    
    case 'ADD_ANECDOTE':
      return state.concat(action.newAnecdote)
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes,
    })
  }
}


export const addVote = anecdote => {
  return async dispatch => {
    const updated = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      updated
    })
}
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      newAnecdote
    })
}
}

export default reducer