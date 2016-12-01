import peg from 'pegjs'
import Rx from 'rxjs'

import './init'  // Sets up the DOM from the app template
import {
  setupPanes, grammarEditor, compileResults, programEditor, testResults
} from './dom'
import {pretty, errMsg} from './format'
import {compileDelay} from './config'

function observeEditor (editor) {
  return Rx.Observable.fromEvent(editor.getSession(), 'change')
    .map(() => editor.getValue())
    .debounceTime(compileDelay)
}

function setupEditors () {
  const grammarObs = observeEditor(grammarEditor)
  const programObs = observeEditor(programEditor)
  const interpObs = observeEditor(interpEditor)

  const parserErrObs = grammarObs.map(genParser)
  const parserObs = parserErrObs.map(([_, parser]) => parser)

  parserErrObs
    .map(parserErrToMsg)
    .subscribe(msg => { compileResults.innerText = msg })

  const astObs = Rx.Observable
    .combineLatest(parserObs, programObs)
    .map(([parser, program]) => parse(parser, program))

  astObs.subscribe(msg => { testResults.innerText = msg })
}

function genParser (grammar) {
  if (!grammar) return [null, null]
  try {
    return [null, peg.generate(grammar)]
  } catch (err) {
    return [err, null]
  }
}

function parserErrToMsg ([err, parser]) {
  if (!err && !parser) {
    return ''
  } else if (err) {
    return errMsg(err)
  } else {
    return 'Compiled successfully!'
  }
}

function parse (parser, program) {
  if (!parser || !program) return ''
  try {
    return pretty(parser.parse(program))
  } catch (e) {
    return errMsg(e)
  }
}

setupPanes()
setupEditors()
