import $ from 'jquery'
import ace from 'brace'

// Kendo
import 'kendo/kendo.ui.Splitter'
import 'kendo/styles/web/kendo.common.core.css'
import 'kendo/styles/web/kendo.default.css'

// ACE
import 'brace/theme/tomorrow'
import './vendor/ace_modes/pegjs'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import './app.css'

export const testResults = document.getElementById('test-results')
export const compileResults = document.getElementById('compile-results')

export const grammarEditor = ace.edit('grammar-editor')
grammarEditor.setTheme('ace/theme/tomorrow')
grammarEditor.getSession().setMode('ace/mode/pegjs')

export const programEditor = ace.edit('program-editor')
programEditor.setTheme('ace/theme/tomorrow')

let _resizing = false
function fireResize () {
  if (_resizing) return
  _resizing = true
  window.dispatchEvent(new Event('resize'))
  _resizing = false
}

export function setupPanes () {
  $('.ide').kendoSplitter({
    resize: fireResize,
    orientation: 'horizontal',
    panes: [
      {collapsible: false, scrollable: false},
      {collapsible: false, scrollable: false}
    ]
  })

  $('.compiler').kendoSplitter({
    resize: fireResize,
    orientation: 'vertical',
    panes: [
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
