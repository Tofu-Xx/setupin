type Fn<T> = (arg: T) => any
// type Afford = Fn<Exclude<any, undefined>>
type Classify<K extends string | number | symbol> = Partial<Record<K, Fn<any>>> & Record<symbol, Fn<any>>
export function when<V extends string | number | symbol>(gist: V): Fn<Classify<V>>
export function when<V extends string | number | symbol>(gist: any, verifyer: V): Fn<Classify<V>>
export function when<V extends string | number | symbol>(gist: any, verifyer: V = gist) {
  return function (classify: Classify<V>) {
    const sym = Object.getOwnPropertySymbols(classify).find(sym => sym.description === 'default') ?? Symbol('default')
    const handler = classify[verifyer] ?? classify[sym]
    return handler?.(gist)
  }
}
export function loaded(callback: () => void) {
  document.addEventListener('DOMContentLoaded', callback)
}
