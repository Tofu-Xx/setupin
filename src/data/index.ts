import ASCII_LOGO from '@/data/ascii-logo.txt?raw'

export const APP_VAR_NAME = 'APP$'
export const REPO_NAME = 'setupin'
export const IMPORTS_JSON = JSON.stringify({
  imports: {
    vue: 'https://unpkg.com/vue/dist/vue.runtime.esm-browser.js',
  },
})
export const INIT_CODE = `
<script ${REPO_NAME}>
${ASCII_LOGO}
  import * as Vue from "vue";
  let ${APP_VAR_NAME} = {}
</script>
`
export const CREATE_ASYNC_APP_CODE = `
Vue.createApp({
  render: () => h(Vue.Suspense, null, { default: () => Vue.h(${APP_VAR_NAME}) })
}).mount(document.body)
`
export const CREATE_APP_CODE = `
Vue.createApp(${APP_VAR_NAME}).mount(document.body)
`
