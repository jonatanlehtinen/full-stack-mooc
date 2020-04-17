import React from 'react'


import "../styles/styles.css"

const Notification = ({ notification }) => {
  if(notification === null) {
    return null
  }

  return (
    <div className={notification.successful ? "success" : "error"}>
      {notification.message}
    </div>
  )
}

export default Notification