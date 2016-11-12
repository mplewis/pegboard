import React from 'react'
import SplitPane from 'react-split-pane'
import PegEditor from './editor'
import PegButtons from './buttons'
import PegStatus from './status'

let source = ''

function onSource (newSource) {
  source = newSource
}

function onCompile () {
}

export default class PegCompiler extends React.Component {
  render () {
    return (
      <SplitPane split="horizontal" defaultSize="50%">
        <PegEditor onChange={onSource}/>
        <SplitPane split="horizontal" defaultSize="50%">
          <PegButtons onCompile={onCompile}/>
          <PegStatus/>
        </SplitPane>
      </SplitPane>
    )
  }
}
