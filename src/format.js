import {prettyIndent} from './config'

export function pretty (obj) {
  return JSON.stringify(obj, null, prettyIndent)
}

export function errMsg (err) {
  const msg = err.message
  delete err.message
  return `${msg}\n\n${pretty(err, prettyIndent)}`
}
