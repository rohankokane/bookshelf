/** @jsx jsx */
import {jsx} from '@emotion/core'
import {Routes, Route, Link as RouterLink, useMatch} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {
  Button,
  ErrorMessage,
  FullPageErrorFallback,
  StyledBurger,
  StyledMenu,
} from './components/lib'
import * as mq from './styles/media-queries'
import * as colors from './styles/colors'
import {useAuth} from './context/auth-context'
import {ReadingListScreen} from './screens/reading-list'
import {FinishedScreen} from './screens/finished'
import {DiscoverBooksScreen} from './screens/discover'
import {BookScreen} from './screens/book'
import {NotFoundScreen} from './screens/not-found'
import {useState} from 'react'
import {Logo} from 'components/logo'

function ErrorFallback({error}) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

const Burger = ({open, setOpen}) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

function AuthenticatedApp() {
  const {user, logout} = useAuth()
  const [open, setOpen] = useState(false)
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div
        css={{
          position: 'fixed',
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: '0px',
          left: '0px',
          right: '0px',
          padding: '0.5rem 2rem',
          background: colors.indigoDarken10,
          zIndex: 1,
          boxShadow: 'rgb(0 0 0 / 20%) 0px 1px 6px 2px',
        }}
      >
        <Logo />
        <h3
          css={{
            fontSize: '1.5rem',
            color: colors.gray10,
            fontWeight: '500',
            margin: '0 0 0 0.5rem',
          }}
        >
          Bookshelf
        </h3>
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '5.5em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '100%',
          },
        }}
      >
        <Burger open={open} setOpen={setOpen} />
        <StyledMenu open={open}>
          <Nav
            onClick={() => {
              setOpen(o => !o)
            }}
            username={user.username}
          >
            <Button variant="secondary" css={{width: '100%'}} onClick={logout}>
              Logout
            </Button>
          </Nav>
        </StyledMenu>
        <main css={{width: '100%'}}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}

function NavLink(props) {
  const match = useMatch(props.to)
  return (
    <RouterLink
      css={[
        {
          display: 'block',
          padding: '8px 15px 8px 10px',
          margin: '5px 0',
          width: '100%',
          height: '100%',
          color: colors.text,
          borderRadius: '2px',
          borderLeft: '5px solid transparent',
          ':hover,:focus': {
            color: colors.indigo,
            textDecoration: 'none',
            background: colors.gray10,
          },
        },
        match
          ? {
              borderLeft: `5px solid ${colors.indigo}`,
              background: colors.gray10,
              ':hover,:focus': {
                background: colors.gray10,
              },
            }
          : null,
      ]}
      {...props}
    />
  )
}

function Nav({onClick, username, children}) {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '5.5rem',
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
      onClick={onClick}
    >
      <p css={{fontSize: '1.25rem', fontWeight: '500'}}>
        Hello, <span>{username}</span>
      </p>
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
          <NavLink to="/list">Reading List</NavLink>
        </li>
        <li>
          <NavLink to="/finished">Finished Books</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
      {children}
    </nav>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<ReadingListScreen />} />
      <Route path="/finished" element={<FinishedScreen />} />
      <Route path="/discover" element={<DiscoverBooksScreen />} />
      <Route path="/book/:bookId" element={<BookScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AuthenticatedApp
