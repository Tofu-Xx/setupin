export const APP_VAR_NAME = '__APP_COMPONENT__'
export const REPO_NAME = 'setupin'
export const IMPORTS_JSON = JSON.stringify({
  imports: {
    vue: 'https://unpkg.com/vue/dist/vue.runtime.esm-browser.js',
  },
})
export const CREATE_ASYNC_APP_CODE = `
import { createApp, h, Suspense } from "vue";
createApp({
  render: () => h(Suspense, null, { default: () => h(${APP_VAR_NAME}) })
}).mount(document.body)
`
export const CREATE_APP_CODE = `
import { createApp } from "vue";
createApp(${APP_VAR_NAME}).mount(document.body)
`
