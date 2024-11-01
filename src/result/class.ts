class Result<T, E> {
  constructor(
    private readonly tag: 'Ok' | 'Err',
    private readonly val: T | E,
  ) {}

  public is_ok() {
    return this.tag === 'Ok'
  }

  public is_ok_and(f: (val: T) => boolean) {
    return this.tag === 'Ok' && f(this.val as T)
  }

  public is_err() {
    return this.tag === 'Err'
  }

  public is_err_and(f: (val: E) => boolean) {
    return this.tag === 'Err' && f(this.val as E)
  }

  public ok() {
    return this.is_ok() ? this.val as T : null
  }

  public err() {
    return this.is_err() ? this.val as E : null
  }
}

export function Ok<T, E>(val: T) {
  return new Result<T, E>('Ok', val)
}

export function Err<T, E>(val: E) {
  return new Result<T, E>('Err', val)
}
