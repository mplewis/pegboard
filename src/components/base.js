import React from 'react'
import Nav from './nav'

export default class Base extends React.Component {
  render () {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    )
  }
}
