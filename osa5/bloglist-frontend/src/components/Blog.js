import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemoveBlog = () => {
    const confirmed = window.confirm(
      `Remove blog ${blog.name} by ${blog.author}`
    )
    if (confirmed) {
      removeBlog(blog.id)
    }
  }

  const blogInfo = () => (
    <div>
      {blog.url} <br />
      {blog.likes}
      <button
        onClick={() => likeBlog(blog.id, blog.likes + 1)}
        id="like-button"
      >
        like
      </button>
      <br />
      <button onClick={handleRemoveBlog} id="remove-blog">
        remove
      </button>
    </div>
  )

  const toggleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div style={blogStyle}>
      <div className="blog-container">
        {blog.title} {blog.author}
        <button onClick={toggleShowInfo} id="view-blog">
          {showInfo ? 'hide' : 'view'}
        </button>
      </div>
      {showInfo ? blogInfo() : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
