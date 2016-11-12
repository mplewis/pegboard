import React from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'

export default class Ide extends React.Component {
  render () {
    return (
      <span>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Pegboard IDE</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/editor">
              <NavItem>Editor</NavItem>
            </LinkContainer>
            <LinkContainer to="/demo">
              <NavItem>Demo</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
        {this.props.children}
      </span>
    )
  }
}
