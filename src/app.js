import $ from 'jquery'
import ace from 'brace'
import peg from 'pegjs'

import 'kendo/kendo.ui.Splitter'
import 'kendo/styles/web/kendo.common.core.css'
import 'kendo/styles/web/kendo.default.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'brace/theme/tomorrow'

import appTemplate from './app.pug'
import './vendor/ace_modes/pegjs'
import './app.css'

const prettyIndent = 2

let grammarEditor
let programEditor
let compileResults
let testResults
let parser

function setupPage () {
  const appHtml = appTemplate()
  console.log(appHtml)
  document.getElementById('app').innerHTML = appHtml
}

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

function setupEditors () {
  grammarEditor = ace.edit('grammar-editor')
  grammarEditor.setTheme('ace/theme/tomorrow')
  grammarEditor.getSession().setMode('ace/mode/pegjs')

  programEditor = ace.edit('program-editor')
  programEditor.setTheme('ace/theme/tomorrow')
}

function bindInputs () {
  let onChange = () => { compile(); parse() }
  grammarEditor.getSession().on('change', onChange)
  programEditor.getSession().on('change', onChange)
}

function bindOutputs () {
  compileResults = $('#compile-results')
  testResults = $('#test-results')
}

function pretty (obj, spaces) {
  return JSON.stringify(obj, null, spaces)
}

function errMsg (err) {
  const msg = err.message
  delete err.message
  return `${msg}\n\n${pretty(err, prettyIndent)}`
}

function compile () {
  parser = null
  const source = grammarEditor.getValue()
  if (!source) {
    compileResults.text('')
    return
  }
  try {
    parser = peg.generate(source)
    compileResults.text('Compiled successfully!')
  } catch (e) {
    compileResults.text(errMsg(e))
  }
}

function parse () {
  const source = programEditor.getValue()
  if (!source) {
    testResults.text('')
    return
  }
  try {
    const results = parser.parse(source)
    testResults.text(pretty(results, prettyIndent))
  } catch (e) {
    testResults.text(errMsg(e))
  }
}

setupPage()
setupPanes()
setupEditors()
bindInputs()
bindOutputs()
