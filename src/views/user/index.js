import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import UserLayout from 'layout/UserLayout'

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
)
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register')
)
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-forgot-password" */ './forgot-password')
)
const ResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ './reset-password')
)

const User = ({ match }) => {
  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/register" render={(props) => <Register {...props} />} />
          <Route
            path="/forgot-password"
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            path="/reset-password"
            render={(props) => <ResetPassword {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </UserLayout>
  )
}

export default User
