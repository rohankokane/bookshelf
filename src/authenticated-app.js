/** @jsx jsx */
import {jsx} from '@emotion/core'
import {
  Routes,
  Route,
  Link as RouterLink,
  useMatch,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {
  Button,
  ErrorMessage,
  FullPageErrorFallback,
  NavButton,
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
import {MdArrowBackIos} from 'react-icons/md'

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
    <StyledBurger
      className={open ? ' open ' : ''}
      open={open}
      onClick={() => setOpen(!open)}
    >
      <svg width="100" height="100" class="ham-svg" viewBox="0 0 100 100">
        <path
          class="line line1"
          d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
        ></path>
        <path class="line line2" d="M 20,50 H 80"></path>
        <path
          class="line line3"
          d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
        ></path>
      </svg>
    </StyledBurger>
  )
}
const BackButton = () => {
  const location = useLocation()
  const navigate = useNavigate()

  if (location.pathname.includes('book')) {
    return (
      <NavButton onClick={() => navigate(-1)}>
        <MdArrowBackIos size={'22'} />
      </NavButton>
    )
  } else return null
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
          background: colors.gray10,
          zIndex: 1,
          boxShadow: 'rgb(0 0 0 / 15%) 0px 0px 5px 1px',
        }}
      >
        <Logo />
        <h3
          css={{
            [mq.small]: {
              display: 'none',
            },
            fontSize: '1.5rem',
            color: colors.text,
            fontWeight: '600',
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
        <BackButton />
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
