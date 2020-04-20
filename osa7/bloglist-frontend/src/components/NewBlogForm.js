import React, { useState } from 'react'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'

const NewBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    props.createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit} id="form">
        <div>
          title:
          <input
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit" id="create-blog-button">
          create
        </button>
      </form>
    </div>
  )
}

export default connect(null, {
  createBlog,
})(NewBlogForm)
