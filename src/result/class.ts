class Result<O = any, E = any> {
  readonly ok?: O
  readonly err?: E
  public readonly isOk: boolean
  public readonly isErr: boolean
  constructor(readonly kind: 'ok' | 'err', val: O | E) {
    this.isOk = this.kind === 'ok'
    this.isErr = this.kind === 'err'
    this[kind] = val as any
  }

  public isOkAnd(f: (val: O) => boolean) {
    return this.isOk && f(this.ok!)
  }

  public isErrAnd(f: (val: E) => boolean) {
    return this.isErr && f(this.err!)
  }
}
export type { Result }
export class Ok<O = any> extends Result {
  constructor(val: O) {
    super('ok', val)
  }
}
export class Err<E = any> extends Result {
  constructor(val: E) {
    super('err', val)
  }
}
