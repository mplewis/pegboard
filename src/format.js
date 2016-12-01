import {prettyIndent} from './config'

export function pretty (obj) {
  if (typeof obj === 'string') return obj
  try {
    return JSON.stringify(obj, null, prettyIndent)
  } catch (e) {
    return (`Pegboard IDE error: Couldn't print object. ` +
            `Error details below:\n\n${errMsg(e)}`)
  }
}

export function errMsg (err) {
  const msg = err.message
  delete err.message
  return `${msg}\n\n${pretty(err, prettyIndent)}`
}
