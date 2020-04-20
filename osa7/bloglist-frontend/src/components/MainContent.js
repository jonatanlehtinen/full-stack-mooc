import React from 'react'
import { connect } from 'react-redux'

import NewBlogForm from './NewBlogForm'
import Blog from './Blog'
import Notification from './Notification'
import { logout } from '../reducers/userReducer'
import {
  setShowCreateBlog,
  likeBlog,
  removeBlog,
} from '../reducers/blogReducer'

const MainContent = (props) => (
  <div>
    <Notification />
    <h2>blogs</h2>
    <p>
      {props.user.name} logged in <button onClick={props.logout}>logout</button>
    </p>
    {props.blogsState.showCreateBlog ? (
      <div>
        <NewBlogForm />
        <button onClick={() => props.setShowCreateBlog(false)}>cancel</button>
      </div>
    ) : (
      <button
        onClick={() => props.setShowCreateBlog(true)}
        id="show-blog-form-button"
      >
        create
      </button>
    )}

    {props.blogsState.blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        likeBlog={() => props.likeBlog(blog.id, blog.likes + 1)}
        removeBlog={() => props.removeBlog(blog.id)}
      />
    ))}
  </div>
)

const mapStateToProps = (state) => {
  return {
    blogsState: state.blogs,
    user: state.users.currentUser,
  }
}

export default connect(mapStateToProps, {
  setShowCreateBlog,
  likeBlog,
  removeBlog,
  logout,
})(MainContent)
