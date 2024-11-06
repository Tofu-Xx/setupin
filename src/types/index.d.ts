declare interface Window {
  Vue: any
}
declare type Fn<T extends any[] = any[], R = any> = (...args: T) => R
declare type Key = string | number | symbol
declare type Tag = HTMLElementTagNameMap
declare type Option<T> = T | null
declare type Maybe<T> = T | undefined
