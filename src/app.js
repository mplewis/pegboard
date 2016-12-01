import peg from 'pegjs'
import Rx from 'rxjs'

import './init'  // Sets up the DOM from the app template
import {
  setupPanes,
  grammarEditor, compileResults,
  programEditor, testResults,
  interpEditor, interpResults
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
    .map(pegErrorToMsg)
    .subscribe(msg => { compileResults.innerText = msg })

  const astErrObs = Rx.Observable
    .combineLatest(parserObs, programObs)
    .map(([parser, program]) => parse(parser, program))
  const astObs = astErrObs.map(([_, ast]) => ast)

  astErrObs
    .map(parseErrorToMsg)
    .subscribe(msg => { testResults.innerText = msg })

  const interpErrObs = Rx.Observable
    .combineLatest(astObs, interpObs)
    .map(([ast, interp]) => interpret(ast, interp))

  interpErrObs
    .map(interpErrorToMsg)
    .subscribe(msg => { interpResults.innerText = msg })
}

function setupDemoValues () {
  grammarEditor.setValue('test = [a-z]+')
  programEditor.setValue('abcd')
  interpEditor.setValue(`
var output = ''
var items = ast.concat(['x', 'y', 'z'])

items.forEach(function (item) {
  output += 'Item: '
  output += item
  output += '\\n'
})

output
  `.trim())
}

function genParser (grammar) {
  if (!grammar) return [null, null]
  try {
    return [null, peg.generate(grammar)]
  } catch (err) {
    return [err, null]
  }
}

function pegErrorToMsg ([err, parser]) {
  if (!err && !parser) {
    return ''
  } else if (err) {
    return errMsg(err)
  } else {
    return 'Compiled successfully!'
  }
}

function parse (parser, program) {
  if (!parser || !program) return [null, null]
  try {
    return [null, parser.parse(program)]
  } catch (e) {
    return [errMsg(e), null]
  }
}

function parseErrorToMsg ([err, ast]) {
  if (!err && !ast) {
    return ''
  } else if (err) {
    return errMsg(err)
  } else {
    return pretty(ast)
  }
}

function interpret (ast, interpreter) {
  if (!ast || !interpreter) return [null, null]
  try {
    const addAst = `var ast = ${JSON.stringify(ast)};\n`
    const toEval = addAst + interpreter
    // eslint-disable-next-line no-eval
    const result = eval(toEval)
    return [null, result]
  } catch (e) {
    return [errMsg(e), null]
  }
}

function interpErrorToMsg ([err, output]) {
  if (!err && !output) {
    return ''
  } else if (err) {
    return errMsg(err)
  } else {
    return pretty(output)
  }
}

setupPanes()
setupEditors()
setupDemoValues()
