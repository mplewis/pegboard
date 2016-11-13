import $ from 'jquery'
import 'kendo/kendo.ui.Splitter'

import 'kendo/styles/web/kendo.common.core.css'
import 'kendo/styles/web/kendo.default.css'
import 'bootstrap/dist/css/bootstrap.css'

$(document).ready(function () {
  $('#vertical').kendoSplitter({
    orientation: 'vertical',
    panes: [
      {collapsible: false},
      {collapsible: false, size: '100px'},
      {collapsible: false, resizable: false, size: '100px'}
    ]
  })

  $('#horizontal').kendoSplitter({
    panes: [
      {collapsible: true},
      {collapsible: false},
      {collapsible: true}
    ]
  })
})
