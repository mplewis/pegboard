import React from 'react'
import SplitPane from 'react-split-pane'

import './ide.css'

export default class Ide extends React.Component {
  render () {
    return (
      <SplitPane split="vertical" defaultSize="50%">
        <h1>One!</h1>
        <SplitPane split="horizontal" defaultSize="50%">
          <h1>Two!</h1>
          <h1>Three!</h1>
        </SplitPane>
      </SplitPane>
    )
  }
}
