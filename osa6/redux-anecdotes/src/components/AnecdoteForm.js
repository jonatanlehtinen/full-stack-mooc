import React from 'react'
import { connect } from 'react-redux' 

import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

  const createAnecdote = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.addAnecdote(content)
    props.setNotification(`new anecdote '${content}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="content"/></div>
        <button>create</button>
      </form>
    </div>
  )
}



export default connect(null, {
  addAnecdote, setNotification
})(AnecdoteForm)