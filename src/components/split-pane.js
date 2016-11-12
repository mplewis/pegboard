import React from 'react'
import SP from 'react-split-pane'

function onDragFinished () {
  window.dispatchEvent(new Event('resize'))
}

export default class SplitPane extends React.Component {
  render () {
    return (
      <SP
        {...this.props}
        onDragFinished={onDragFinished}
      >
        {this.props.children}
      </SP>
    )
  }
}
