import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = {
  blogs: [],
  showCreateBlog: false,
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_BLOGS': {
      const sortedBlogs = action.blogs.sort((a, b) =>
        a.likes < b.likes ? 1 : -1
      )
      return { ...state, blogs: sortedBlogs }
    }
    case 'CREATE_BLOG': {
      const updatedBlogs = state.blogs.concat(action.newBlog)
      const sortedBlogs = updatedBlogs.sort((a, b) =>
        a.likes < b.likes ? 1 : -1
      )
      return { ...state, blogs: sortedBlogs }
    }
    case 'UPDATE_LIKES': {
      const { id, likes } = action
      const updatedBlogs = state.blogs.map((blog) =>
        blog.id === id ? { ...blog, likes } : blog
      )
      const sortedBlogs = updatedBlogs.sort((a, b) =>
        a.likes <= b.likes ? 1 : -1
      )
      return { ...state, blogs: sortedBlogs }
    }
    case 'REMOVE_BLOG': {
      console.log(action.id)
      const updatedBlogs = state.blogs.filter((blog) => blog.id !== action.id)
      const sortedBlogs = updatedBlogs.sort((a, b) =>
        a.likes < b.likes ? 1 : -1
      )
      return { ...state, blogs: sortedBlogs }
    }
    case 'SET_SHOW_CREATE_BLOG': {
      return { ...state, showCreateBlog: action.show }
    }
    default:
      return state
  }
}

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      blogs,
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(
        setNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} added`,
          true
        )
      )
      dispatch({
        type: 'CREATE_BLOG',
        newBlog,
      })
    } catch (err) {
      console.log(err)
      dispatch(setNotification('Failed to add new blog', false))
    }
  }
}

export const likeBlog = (id, likes) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.like(id, { likes })
      dispatch(setNotification('Like added succesfully', true))
      dispatch({
        type: 'UPDATE_LIKES',
        id: likedBlog.id,
        likes: likedBlog.likes,
      })
    } catch (err) {
      console.log(err)
      setNotification('Failed to add like', false)
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(setNotification('Successfully removed blog', true))
      dispatch({
        type: 'REMOVE_BLOG',
        id,
      })
    } catch (err) {
      console.log(err)
      setNotification('Failed to remove blog', false)
    }
  }
}

export const setShowCreateBlog = (show) => {
  return {
    type: 'SET_SHOW_CREATE_BLOG',
    show,
  }
}

export default reducer
