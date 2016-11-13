import $ from 'jquery'
import 'kendo/kendo.ui.Splitter'
import ace from 'brace'

import 'kendo/styles/web/kendo.common.core.css'
import 'kendo/styles/web/kendo.default.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow'
import './app.css'

function setupPanes () {
  $('.ide').kendoSplitter({
    orientation: 'horizontal',
    panes: [
      {collapsible: false},
      {collapsible: false}
    ]
  })

  $('.compiler').kendoSplitter({
    orientation: 'vertical',
    panes: [
      {collapsible: false},
      {collapsible: false},
      {collapsible: false}
    ]
  })

  $('.tester').kendoSplitter({
    orientation: 'vertical',
    panes: [
      {collapsible: false},
      {collapsible: false}
    ]
  })
}

function setupEditor () {
  const editor = ace.edit('grammar-editor')
  editor.getSession().setMode('ace/mode/javascript')
  editor.setTheme('ace/theme/tomorrow')
}

setupPanes()
setupEditor()
