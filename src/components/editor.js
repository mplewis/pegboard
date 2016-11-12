import React from 'react'
import SplitPane from './split-pane'
import PegEditor from './peg-editor'

import './editor.css'

export default class Editor extends React.Component {
  render () {
    return (
      <SplitPane split="vertical" defaultSize="50%">
        <SplitPane split="horizontal" defaultSize="50%">
          <PegEditor />
          <SplitPane split="horizontal" defaultSize="50%">
            <p>Buttons</p>
            <p>Results</p>
          </SplitPane>
        </SplitPane>
        <SplitPane split="horizontal" defaultSize="50%">
          <p>To Parse</p>
          <p>Results</p>
        </SplitPane>
      </SplitPane>
    )
  }
}
