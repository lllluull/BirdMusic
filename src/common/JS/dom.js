export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let classlist = el.className.split(' ')
  classlist.push(className)
  el.className = classlist.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
