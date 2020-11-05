import { Container } from '@material-ui/core'
import React from 'react'
import logo from './../logo.svg'
import './Home.css'

export default class Quiz extends React.Component {
  render() {
    return (
      <div>
        <Container maxWidth="sm">
          <img src={logo} className="App-logo" alt="logo" />
        </Container>
      </div>
    )
  }
}
