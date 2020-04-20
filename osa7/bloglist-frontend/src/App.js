import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import MainContent from './components/MainContent'
import LoginForm from './components/LoginForm'
import UsersView from './components/UsersView'
import { getBlogs } from './reducers/blogReducer'
import { loadCredentials } from './reducers/userReducer'

const App = (props) => {
  useEffect(() => {
    props.getBlogs()
    props.loadCredentials()
  }, [])

  const MainView = () => (props.user === null ? <LoginForm /> : <MainContent />)

  return (
    <Switch>
      <Route path="/users">
        <UsersView />
      </Route>
      <Route path="/">
        <MainView />
      </Route>
    </Switch>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.currentUser,
  }
}

export default connect(mapStateToProps, { getBlogs, loadCredentials })(App)
