export function once(fn: (...args: any[]) => any) {
  let called = false
  return function (...args: any[]) {
    if (!called) {
      called = true
      return fn.apply(this, args)
    }
  }
}
