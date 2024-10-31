type Classify<K extends Key> = Partial<Record<K, Fn<[any]>>> & Record<symbol, Fn<[any]>>
export function when<V extends Key>(gist: V): Fn<[Classify<V>]>
export function when<V extends Key>(gist: any, verifyer: V): Fn<[Classify<V>]>
export function when<V extends Key>(gist: any, verifyer: V = gist) {
  return function (classify: Classify<V>) {
    const sym = Object.getOwnPropertySymbols(classify).find(sym => sym.description === 'default')
    const handler = classify[verifyer] ?? (sym && classify[sym])
    return handler?.(gist)
  }
}
