/** @jsx jsx */
import {jsx} from '@emotion/core'

import {Link as RouterLink} from 'react-router-dom'
import styled from '@emotion/styled/macro'
import {keyframes} from '@emotion/core'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {Dialog as ReachDialog} from '@reach/dialog'
import {FaSpinner} from 'react-icons/fa'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

const BookListUL = styled.ul({
  listStyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
  gridGap: '1em',
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
  link: {
    background: 'transparent',
    color: colors.text,
    fontWeight: '500',
    textDecoration: 'underline',
    padding: '5px',
  },
}
const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({variant = 'primary'}) => buttonVariants[variant],
)

const inputStyles = {
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
}

const Input = styled.input({borderRadius: '3px'}, inputStyles)
const Textarea = styled.textarea(inputStyles)

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  )
}

const Link = styled(RouterLink)({
  color: colors.indigo,
  ':hover': {
    color: colors.indigoDarken10,
    textDecoration: 'underline',
  },
})

const errorMessageVariants = {
  stacked: {display: 'block'},
  inline: {display: 'inline-block'},
}

function ErrorMessage({error, variant = 'stacked', ...props}) {
  return (
    <div
      role="alert"
      css={[{color: colors.danger}, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          {whiteSpace: 'break-spaces', margin: '0', marginBottom: -5},
          errorMessageVariants[variant],
        ]}
      >
        {error.message}
      </pre>
    </div>
  )
}

function FullPageErrorFallback({error}) {
  return (
    <div
      role="alert"
      css={{
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

const StyledMenu = styled.nav`
  position: 'relative';
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: ${colors.base};
    box-shadow: rgb(0 0 0 / 20%) 2px 0px 10px 2px;
    z-index: 2;
    transition: transform 0.3s ease-in-out;
    transform: ${({open}) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    height: 100vh;
    text-align: left;
    padding: 5rem 2rem;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`
const StyledBurger = styled.button`
  @media (min-width: 991px) {
    display: none;
  }
  position: fixed;
  top: 18px;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.2rem;
    background: ${({open}) => (open ? colors.text : colors.base)};

    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({open}) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({open}) => (open ? '0' : '1')};
      transform: ${({open}) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({open}) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`

export {
  FullPageErrorFallback,
  ErrorMessage,
  CircleButton,
  BookListUL,
  Spinner,
  Button,
  Input,
  Textarea,
  Dialog,
  FormGroup,
  FullPageSpinner,
  Link,
  StyledMenu,
  StyledBurger,
}
