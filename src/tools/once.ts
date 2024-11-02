import type { Result } from '../result'
import { Err, Ok } from '../result'

export function once<T extends Fn>(fn: T): Fn<Parameters<T>, Result<ReturnType<T>, string>> {
  let called = false
  return function (...args) {
    if (called)
      return new Err(`${fn.name} called more than once`)
    called = true
    return new Ok(fn(...args))
  }
}
