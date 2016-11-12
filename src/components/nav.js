import React from 'react'
import {Navbar, NavItem, Nav as BNav} from 'react-bootstrap'
import {Link} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'

import './nav.css'

export default class Nav extends React.Component {
  render () {
    return (
      <div>
        <Navbar staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Pegboard IDE</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <BNav>
            <LinkContainer to="/editor">
              <NavItem>Editor</NavItem>
            </LinkContainer>
            <LinkContainer to="/demo">
              <NavItem>Demo</NavItem>
            </LinkContainer>
          </BNav>
        </Navbar>
        {this.props.children}
      </div>
    )
  }
}
