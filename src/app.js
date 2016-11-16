import $ from 'jquery'
import ace from 'brace'
import peg from 'pegjs'
import Rx from 'rxjs'

import 'kendo/kendo.ui.Splitter'
import 'kendo/styles/web/kendo.common.core.css'
import 'kendo/styles/web/kendo.default.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'brace/theme/tomorrow'

import appTemplate from './app.pug'
import './vendor/ace_modes/pegjs'
import './app.css'

const prettyIndent = 2  // spaces to use when pretty printing json
const compileDelay = 250  // ms between edits before recompiling

let compileResults
let testResults

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

function observeEditor (editor) {
  return Rx.Observable.fromEvent(editor.getSession(), 'change')
    .map(() => editor.getValue())
    .debounceTime(compileDelay)
}

function setupEditors () {
  const grammarEditor = ace.edit('grammar-editor')
  grammarEditor.setTheme('ace/theme/tomorrow')
  grammarEditor.getSession().setMode('ace/mode/pegjs')

  const programEditor = ace.edit('program-editor')
  programEditor.setTheme('ace/theme/tomorrow')

  const grammarObs = observeEditor(grammarEditor)
  const programObs = observeEditor(programEditor)
  const parserErrObs = grammarObs.map((grammar) => {
    try {
      return [null, peg.generate(grammar)]
    } catch (err) {
      return [err, null]
    }
  })
  const parserObs = parserErrObs.map(([_, parser]) => parser)
  parserErrObs.subscribe(i => console.log('parserErr:', i))
  parserObs.subscribe(i => console.log('parser:', i))

  parserErrObs.map(([err, parser]) => {
    if (err) { return errMsg(err) } else { return 'Compiled successfully!' }
  }).subscribe(msg => compileResults.text(msg))

  Rx.Observable.combineLatest(parserObs, programObs).subscribe(i => console.log(i))
  Rx.Observable.combineLatest(parserObs, programObs)
    .map(([parser, program]) => parse(parser, program))
    .subscribe(msg => testResults.text(msg))
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

function parse (parser, program) {
  if (!parser || !program) {
    return ''
  }
  try {
    const ast = parser.parse(program)
    return pretty(ast, prettyIndent)
  } catch (e) {
    return errMsg(e)
  }
}

setupPage()
setupPanes()
setupEditors()
bindOutputs()
