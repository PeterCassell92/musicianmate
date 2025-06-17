import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'

//Presently this does not accept children.
type SecureRouteProps = {
  path: string,
  exact? : boolean,
  component: React.ComponentType<any>
}

function SecureRoute({ component: Component, ...rest } : SecureRouteProps) {
  if (!isAuthenticated()) {
    removeToken()
    return (<Redirect to="/login" />)
  }
  return <Route {...rest} component={Component} />
}

export default SecureRoute