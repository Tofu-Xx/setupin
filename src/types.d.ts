declare type Fn<T extends any[] = [any], R = any> = (...args: T) => R
declare type Key = string | number | symbol
declare type Tag = HTMLElementTagNameMap
declare module 'https://unpkg.com/vue/dist/vue.esm-browser.prod.js' {
  export * from 'vue'
}
declare interface Window {
  Vue: typeof import('https://unpkg.com/vue/dist/vue.esm-browser.prod.js')
}
