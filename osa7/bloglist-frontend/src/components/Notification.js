import React from 'react'
import { connect } from 'react-redux'

import '../styles/styles.css'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.successful ? 'success' : 'error'}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps, null)(Notification)
