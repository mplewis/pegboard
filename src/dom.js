import $ from 'jquery'
import ace from 'brace'

// Kendo
import 'kendo/kendo.ui.Splitter'
import 'kendo/styles/web/kendo.common.core.css'
import 'kendo/styles/web/kendo.default.css'

// ACE
import 'brace/theme/tomorrow'
import 'brace/mode/javascript'
import './vendor/ace_modes/pegjs'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import './app.css'

export const testResults = document.getElementById('test-results')
export const compileResults = document.getElementById('compile-results')
export const interpResults = document.getElementById('interp-results')

export const grammarEditor = ace.edit('grammar-editor')
grammarEditor.setTheme('ace/theme/tomorrow')
grammarEditor.getSession().setMode('ace/mode/pegjs')

export const programEditor = ace.edit('program-editor')
programEditor.setTheme('ace/theme/tomorrow')

export const interpEditor = ace.edit('interp-editor')
interpEditor.setTheme('ace/theme/tomorrow')
interpEditor.getSession().setMode('ace/mode/javascript')

let _resizing = false
function fireResize () {
  if (_resizing) return
  _resizing = true
  window.dispatchEvent(new Event('resize'))
  _resizing = false
}

export function setupPanes () {
  const mainPane = '.panes'
  const idePane = '.ide'
  const ideSubPanes = ['.compiler', '.tester', '.interp']
  const textPaneHeight = '90px'
  const textPaneOptions = {collapsible: true, size: textPaneHeight}

  $(mainPane).kendoSplitter({
    resize: fireResize,
    orientation: 'vertical',
    panes: [
      textPaneOptions,  // intro
      {}  // ide
    ]
  })

  let panes = []
  const pane = {scrollable: false}
  for (var i = 0; i < ideSubPanes.length; i++) panes.push(pane)
  $(idePane).kendoSplitter({
    resize: fireResize,
    orientation: 'horizontal',
    panes: panes
  })

  ideSubPanes.forEach(sel => {
    $(sel).kendoSplitter({
      resize: fireResize,
      orientation: 'vertical',
      panes: [
        textPaneOptions,  // info
        {},  // editor
        {}   // output
      ]
    })
  })
}
