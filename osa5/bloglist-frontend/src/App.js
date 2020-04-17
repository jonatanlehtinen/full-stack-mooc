import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/loginService'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [showCreateBlog, setShowCreateBlog] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, successful) => {
    const newNotification = { message, successful }
    setNotification(newNotification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`${user.name} logged in successfully`, true)
    } catch (exception) {
      showNotification('Wrong username or password', false)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleLike = async (id, likes) => {
    try {
      await blogService.like(id, { likes })
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? { ...blog, likes } : blog
      )
      updatedBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
      console.log(updatedBlogs)
      setBlogs(updatedBlogs)
      showNotification('Like added succesfully', true)
    } catch (exception) {
      console.log(exception)
      showNotification('Failed to add like', false)
    }
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      const updatedBlogs = blogs.concat(response)
      updatedBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
      setBlogs(updatedBlogs)
      showNotification(
        `A new blog ${newBlog.title} by ${newBlog.author} added`,
        true
      )
      setShowCreateBlog(false)
    } catch (exception) {
      showNotification('Failed to add new blog', false)
    }
  }

  const handleRemove = async (id) => {
    try {
      await blogService.remove(id)
      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      updatedBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
      setBlogs(updatedBlogs)
      showNotification('Successfully removed blog', true)
    } catch (exception) {
      console.log(exception)
      showNotification('Failed to remove blog', false)
    }
  }

  const loginForm = () => (
    <div>
      <Notification notification={notification} />
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const content = () => (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      {showCreateBlog ? (
        <div>
          <NewBlogForm createBlog={handleCreateBlog} />
          <button onClick={() => setShowCreateBlog(false)}>cancel</button>
        </div>
      ) : (
        <button onClick={() => setShowCreateBlog(true)}>create</button>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={handleLike}
          removeBlog={handleRemove}
        />
      ))}
    </div>
  )

  return user === null ? loginForm() : content()
}

export default App
