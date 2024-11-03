declare module '../vendor/vue.esm' {
  export * from 'vue'
}
declare module '../vendor/vue.esm.prod' {
  export * from 'vue'
}
declare interface Window {
  Vue: typeof import('../vendor/vue.esm') & typeof import('../vendor/vue.esm.prod')
}

declare type Fn<T extends any[] = any[], R = any> = (...args: T) => R
declare type Key = string | number | symbol
declare type Tag = HTMLElementTagNameMap
declare type Option<T> = T | null
declare type Maybe<T> = T | undefined
