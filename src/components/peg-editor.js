import React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/tomorrow'

function onChange (newValue) {
  console.log(`Chars: ${newValue.length}`)
}

export default class PegEditor extends React.Component {
  render () {
    return (
      <AceEditor
        mode="javascript"
        theme="tomorrow"
        onChange={onChange}
      />
    )
  }
}
