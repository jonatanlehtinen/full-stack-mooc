import React from 'react'

import TYPES from "./actionTypes"

import "./styles.css"

const Notification = ({ notification }) => {
  if(notification === null) {
    return null
  }

  const success = notification.successful

  let message = ''
  switch (notification.action) {
    case TYPES.ADD:
      message =  success ? `Added ${notification.personName}` : notification.message
      break
    case TYPES.DELETE:
      message = success ? `Deleted ${notification.personName}` : `Failed to delete ${notification.personName}`
      break
    case TYPES.UPDATE:
      message = success ? `Updated ${notification.personName}'s number` : `Failed to update ${notification.personName}'s number` 
      break
  }

  return (
    <div className={notification.successful ? "success" : "error"}>
      {message}
    </div>
  )
}

export default Notification