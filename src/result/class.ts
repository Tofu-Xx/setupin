class Result<O, E> {
  constructor(
    private readonly tag: 'Ok' | 'Err',
    private readonly val: O | E,
  ) {}

  public is_ok() {
    return this.tag === 'Ok'
  }

  public is_ok_and(f: (val: O) => boolean) {
    return this.tag === 'Ok' && f(this.val as O)
  }

  public is_err() {
    return this.tag === 'Err'
  }

  public is_err_and(f: (val: E) => boolean) {
    return this.tag === 'Err' && f(this.val as E)
  }

  public ok() {
    return this.is_ok() ? this.val as O : null
  }

  public err() {
    return this.is_err() ? this.val as E : null
  }
}

export function Ok<O, E>(val: O) {
  return new Result<O, E>('Ok', val)
}

export function Err<O, E>(val: E) {
  return new Result<O, E>('Err', val)
}
