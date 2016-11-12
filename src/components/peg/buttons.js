import React from 'react'
import {Button} from 'react-bootstrap'

import './buttons.css'

export default class PegButtons extends React.Component {
  render () {
    return (
      <div className="peg-buttons">
        <Button bsStyle="success"
                onClick={this.props.onCompile}>
          Compile &raquo;
        </Button>
      </div>
    )
  }
}
