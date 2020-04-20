const initialState = null

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, successful, timeOut = 5) => {
  return async (dispatch) => {
    dispatch(hideNotification(timeOut))
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message,
        successful,
      },
    })
  }
}

let currentTimeout = null

export const hideNotification = (timeOut) => {
  return async (dispatch) => {
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(
      () =>
        dispatch({
          type: 'HIDE_NOTIFICATION',
        }),
      timeOut * 1000
    )
  }
}

export default reducer
