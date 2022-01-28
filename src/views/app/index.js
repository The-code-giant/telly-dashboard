import React, { Suspense } from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import AppLayout from 'layout/AppLayout'
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Home = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './home-page')
)
const Chat = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './chat-page')
)
// const SecondMenu = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
// );
// const BlankPage = React.lazy(() =>
//   import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
// );
const CalendarPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-inbox-page" */ './calendar-page')
)
const AvailabilityPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-inbox-page" */ './availability-page')
)
const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
            <Route
              path={`${match.url}/home`}
              render={(props) => <Home {...props} />}
            />
            <Route
              path={`${match.url}/chat`}
              render={(props) => <Chat {...props} />}
            />
            {/* <Route
              path={`${match.url}/second-menu`}
              render={(props) => <SecondMenu {...props} />}
            /> */}
            <Route
              path={`${match.url}/calendar`}
              render={(props) => <CalendarPage {...props} />}
            />
            <Route
              path={`${match.url}/availability`}
              render={(props) => <AvailabilityPage {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            {/* <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            /> */}
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  )
}

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu
  return { containerClassnames }
}

export default withRouter(connect(mapStateToProps, {})(App))
