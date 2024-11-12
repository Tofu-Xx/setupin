import ASCII_LOGO from '@/assets/ascii-logo.txt?raw'

export const APP_VAR_NAME = 'APP$'
export const REPO_NAME = 'setupin'
export const IMPORTS_JSON = JSON.stringify({ imports: { vue: __VUE_URL__ } })
export const INIT_CODE = `
  <script>
    ${__IS_DEV__ ? ASCII_LOGO : ''}
    import * as Vue from "vue";
    let ${APP_VAR_NAME} = Object.create(null);
  </script>
` as const
export const CREATE_APP_CODE = `
  Vue.createApp(${APP_VAR_NAME}).mount(document.body)
` as const
export const CREATE_ASYNC_APP_CODE = `
  const { h, Suspense } = Vue
  Vue.createApp({
    render: () => h(Suspense, null, { default: () => h(${APP_VAR_NAME}) })
  }).mount(document.body)
` as const
