export function once(fn: Fn) {
  let called = false
  return function (...args: any[]) {
    if (called)
      return new Error(`${fn.name} called more than once`)
    called = true
    return fn(...args)
  }
}
