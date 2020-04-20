import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import LoginForm from './LoginForm'
import { getUsers } from '../reducers/userReducer'
import { logout } from '../reducers/userReducer'

const UsersView = (props) => {
  useEffect(() => {
    props.getUsers()
  }, [])

  const topContent = () => {
    return props.currentUser === null ? (
      <LoginForm />
    ) : (
      <div>
        <h2>blogs</h2>
        <p>
          {props.currentUser.name} logged in
          <button onClick={props.logout}>logout</button>
        </p>
      </div>
    )
  }

  return (
    <div>
      {topContent()}
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>
            <b>blogs created</b>
          </th>
        </tr>
        {props.allUsers.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.users.allUsers,
    currentUser: state.users.currentUser,
  }
}

export default connect(mapStateToProps, { getUsers, logout })(UsersView)
