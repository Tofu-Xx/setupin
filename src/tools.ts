type Fn<T> = (arg: T) => any
type Classify<K extends string | number | symbol> = Partial<Record<K, Fn<any>> & Record<symbol, Fn<any>>>
export function when<V extends string | number | symbol>(gist: V): Fn<Classify<V>>
export function when<V extends string | number | symbol>(gist: any, verifyer: V): Fn<Classify<V>>
export function when<V extends string | number | symbol>(gist: any, verifyer?: V) {
  const fnname: V = verifyer ?? gist
  return function (classify: Classify<V>) {
    const another = Object.getOwnPropertySymbols(classify).find(sym => sym.description === 'default') ?? Symbol('default')
    const handler = classify[fnname] ?? classify[another]
    return handler?.(gist)
  }
}
export function loaded(callback: () => void) {
  document.addEventListener('DOMContentLoaded', callback)
}
