import { Err, Ok } from '../result'

export function once(fn: Fn) {
  let called = false
  return function (...args: any[]) {
    if (called)
      return new Err(`${fn.name} called more than once`)
    called = true
    return new Ok(fn(...args))
  }
}
