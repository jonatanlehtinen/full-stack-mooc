
const initialState = ""

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'SHOW_VOTE_ADDED':
      const votedText = `You voted '${action.anecdote}'`
      return votedText
    case 'SHOW_ANECDOTE_ADDED':
      const addedText = `You added '${action.anecdote}'`
      return addedText
    case 'HIDE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const showVoteAddedNotification = anecdote => {
  return {
    type: 'SHOW_VOTE_ADDED',
    anecdote
  }
}

export const showAnecdoteAddedNotification = anecdote => {
  return {
    type: 'SHOW_ANECDOTE_ADDED',
    anecdote
  }
}

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION"
  }
}

export default reducer