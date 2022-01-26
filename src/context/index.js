import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {ReactQueryConfigProvider} from 'react-query'
import {AuthProvider} from './auth-context'
import ScrollToTop from 'components/ScrollToTop'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
  },
}

function AppProviders({children}) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <ScrollToTop />
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </ReactQueryConfigProvider>
  )
}

export {AppProviders}
