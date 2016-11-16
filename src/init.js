import appTemplate from './app.pug'

const appHtml = appTemplate()
console.log(appHtml)
document.getElementById('app').innerHTML = appHtml
