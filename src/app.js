import $ from 'jquery'
import 'kendo/kendo.ui.Splitter'
import ace from 'brace'
import peg from 'pegjs'

import 'kendo/styles/web/kendo.common.core.css'
import 'kendo/styles/web/kendo.default.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'
import './app.css'

let editor
let compileResults

let _resizing = false
function fireResize () {
  if (_resizing) return
  _resizing = true
  window.dispatchEvent(new Event('resize'))
  _resizing = false
}

function setupPanes () {
  $('.ide').kendoSplitter({
    resize: fireResize,
    orientation: 'horizontal',
    panes: [
      {collapsible: false},
      {collapsible: false}
    ]
  })

  $('.compiler').kendoSplitter({
    resize: fireResize,
    orientation: 'vertical',
    panes: [
      {collapsible: false},
      {collapsible: false},
      {collapsible: false}
    ]
  })

  $('.tester').kendoSplitter({
    resize: fireResize,
    orientation: 'vertical',
    panes: [
      {collapsible: false},
      {collapsible: false}
    ]
  })
}

function setupEditor () {
  editor = ace.edit('grammar-editor')
  editor.getSession().setMode('ace/mode/javascript')
  editor.setTheme('ace/theme/tomorrow')
}

function bindInputs () {
  $('#compile').click(() => {
    const source = editor.getValue()
    try {
      peg.generate(source, {trace: true})
      compileResults.text('Compiled successfully!')
    } catch (e) {
      const err = {
        location: e.location,
        expected: e.expected,
        found: e.found
      }
      const msg = `${e.message}\n\n${JSON.stringify(err, null, 4)}`
      compileResults.text(msg)
    }
  })
}

function bindOutputs () {
  compileResults = $('#compile-results')
}

setupPanes()
setupEditor()
bindInputs()
bindOutputs()
