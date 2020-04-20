import usersService from '../services/users'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = {
  allUsers: [],
  currentUser: null,
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.user }
    case 'LOGOUT':
      return { ...state, currentUser: null }
    case 'SET_ALL_USERS':
      return { ...state, allUsers: action.users }
    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await usersService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setNotification(`${user.name} logged in successfully`, true))
      dispatch({
        type: 'SET_CURRENT_USER',
        user,
      })
    } catch (err) {
      console.log(err)
      dispatch(setNotification('Wrong username or password', false))
    }
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogUser')
  return {
    type: 'LOGOUT',
  }
}

export const loadCredentials = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'SET_CURRENT_USER',
      user,
    }
  } else {
    return {
      type: '',
    }
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAllUsers()
    dispatch({
      type: 'SET_ALL_USERS',
      users,
    })
  }
}

export default reducer
