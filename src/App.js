import { initializeParse } from '@parse/react'
import React, { Suspense } from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { NotificationContainer } from './components/common/react-notifications'
import { adminRoot, UserRole } from './constants/defaultValues'
import { ProtectedRoute } from './helpers/authHelper'
import './helpers/Firebase'
import { getDirection } from './helpers/Utils'
import AppLocale from './lang'

require('dotenv').config({ path: __dirname + '/.env' }) // eslint-disable-line

console.log('inited parse', process.env.REACT_APP_API_PARSE_SERVER_URL)

initializeParse(
  process.env.REACT_APP_API_PARSE_SERVER_URL, // custom url
  process.env.REACT_APP_API_PARSE_APPLICATION_ID, // app id
  process.env.REACT_APP_API_JAVASCRIPT_KEY // js
)

const ViewHome = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home')
)
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
)
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
)
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
)
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/unauthorized')
)

class App extends React.Component {
  constructor(props) {
    super(props)
    const direction = getDirection()
    if (direction.isRtl) {
      document.body.classList.add('rtl')
      document.body.classList.remove('ltr')
    } else {
      document.body.classList.add('ltr')
      document.body.classList.remove('rtl')
    }
  }

  render() {
    const { locale } = this.props
    const currentAppLocale = AppLocale[locale]

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <>
            <NotificationContainer />
            {/* {isMultiColorActive && <ColorSwitcher />} */}
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <ProtectedRoute
                    path={adminRoot}
                    component={ViewApp}
                    roles={[UserRole.Admin, UserRole.Editor]}
                  />
                  <Route path="/" render={(props) => <ViewUser {...props} />} />
                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path="/unauthorized"
                    exact
                    render={(props) => <ViewUnauthorized {...props} />}
                  />
                  <Route
                    path="/user"
                    exact
                    render={(props) => <ViewHome {...props} />}
                  />
                  {/*
                  <Redirect exact from="/" to={adminRoot} />
                  */}
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { currentUser } = authUser
  const { locale } = settings
  return { currentUser, locale }
}
const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(App)
