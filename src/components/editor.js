import React from 'react'
import SplitPane from 'react-split-pane'
import PegEditor from './peg-editor'

import './editor.css'

export default class Editor extends React.Component {
  render () {
    return (
      <SplitPane split="vertical" defaultSize="50%">
        <PegEditor />
        <SplitPane split="horizontal" defaultSize="50%">
          <h1>Two!</h1>
          <h1>Three!</h1>
        </SplitPane>
      </SplitPane>
    )
  }
}
