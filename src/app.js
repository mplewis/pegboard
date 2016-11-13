import $ from 'jquery'
import 'kendo/kendo.ui.Splitter'

import 'kendo/styles/web/kendo.common.core.css'
import 'kendo/styles/web/kendo.default.css'
import 'bootstrap/dist/css/bootstrap.css'
import './app.css'

$(document).ready(function () {
  $('.editor').kendoSplitter({
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
})
