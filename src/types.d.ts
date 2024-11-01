declare module './assets/vue.esm' {
  export * from 'vue'
}
declare module './assets/vue.esm.prod' {
  export * from 'vue'
}
declare interface Window {
  Vue: typeof import('./assets/vue.esm') & typeof import('./assets/vue.esm.prod')
}
/* tool types */
declare type Fn<T extends any[] = any[], R = any> = (...args: T) => R
declare type Key = string | number | symbol
declare type Tag = HTMLElementTagNameMap
declare type Result<O, E> = import('./result/class').Result<O, E>
declare type Option<T> = T | null
declare type Maybe<T> = T | undefined
/* types */
declare interface Context {
  template: string
  importsCode: string
  setupCode: string
  retNames: string[]
  isAsync: boolean
}
