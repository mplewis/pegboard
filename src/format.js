const prettyIndent = 2  // spaces to use when pretty printing json

export function pretty (obj) {
  return JSON.stringify(obj, null, prettyIndent)
}

export function errMsg (err) {
  const msg = err.message
  delete err.message
  return `${msg}\n\n${pretty(err, prettyIndent)}`
}
