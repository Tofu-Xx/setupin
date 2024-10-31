declare module 'https://unpkg.com/vue/dist/vue.esm-browser.prod.js' {
  export * from 'vue'
}
declare type Vue = typeof import('https://unpkg.com/vue/dist/vue.esm-browser.prod.js')
declare interface Window {
  Vue: Vue
}
/* tool types */
declare type Fn<T extends any[] = [any], R = any> = (...args: T) => R
declare type Key = string | number | symbol
declare type Tag = HTMLElementTagNameMap
/* types */
declare interface Context {
  template: string
  importsCode: string
  setupCode: string
  retNames: string[]
  isAsync: boolean
}
