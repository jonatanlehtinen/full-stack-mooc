
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showVoteAddedNotification, hideNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const sorted = state.anecdotes.sort((a, b) => a.votes < b.votes ? 1 : -1)
    return sorted.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(showVoteAddedNotification(content))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList

