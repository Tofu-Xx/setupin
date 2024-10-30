type Handler<T> = (value: T) => any
type Classify<K extends string | number | symbol> = {
  [P in K]?: Handler<any>
} & {
  [key: symbol]: Handler<any>
}
export function when<V extends string | number | symbol>(gist: any, verifyer: V = gist) {
  return function (classify: Classify<V>) {
    const another = Object.getOwnPropertySymbols(classify).find(sym => sym.description === 'default') ?? Symbol('default')
    const handler = classify[verifyer] ?? classify[another]
    return handler?.(gist)
  }
}

// // /*  */
// const v: string | any[] = 'ye'
// when(v)({
//   yes() {
//     console.log('yes')
//   },
//   no() {
//     console.log('no')
//   },
//   [Symbol('default')]: () => {
//     console.log('default')
//   },
// })
export function loaded(callback: () => void) {
  document.addEventListener('DOMContentLoaded', callback)
}
