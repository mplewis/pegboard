import React from 'react'
import SplitPane from './split-pane'
import PegCompiler from './peg/compiler'

import './editor.css'

export default class Editor extends React.Component {
  render () {
    return (
      <SplitPane split="vertical" defaultSize="50%">
        <PegCompiler />
        <SplitPane split="horizontal" defaultSize="50%">
          <p>To Parse</p>
          <p>Results</p>
        </SplitPane>
      </SplitPane>
    )
  }
}
