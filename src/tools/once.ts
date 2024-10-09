export function once<F extends (...args: any[]) => any>(fn: F): F {
  let called = false
  return function (...args) {
    if (called) return void 0
    called = true
    return fn.apply(this, args)
  } as F
}
