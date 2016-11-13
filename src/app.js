import $ from 'jquery'
import 'kendo/kendo.ui.Splitter'
import ace from 'brace'

import 'kendo/styles/web/kendo.common.core.css'
import 'kendo/styles/web/kendo.default.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'
import './app.css'

let editor

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
    console.log(source.length)
  })
}

setupPanes()
setupEditor()
bindInputs()
