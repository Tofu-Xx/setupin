import ASCII_LOGO from '@/assets/ascii-logo.txt?raw'

export const APP_VAR_NAME = 'APP$'
export const REPO_NAME = 'setupin'
export const IMPORTS_CODE = JSON.stringify({ imports: { vue: __VUE_URL__ } })
export const INIT_CODE = `
  ${__IS_DEV__ ? ASCII_LOGO : ''}
  import * as Vue from "vue";
  let ${APP_VAR_NAME} = Object.create(null);
` as const
export const CREATE_APP_CODE = `
  Vue.createApp(Vue.defineComponent(
    String(${APP_VAR_NAME}.setup).startsWith('async')
    ? () => () => Vue.h(Vue.Suspense, null, { 
      default: Vue.h(${APP_VAR_NAME}),
      fallback: Vue.h('div', 'Loading...'),
    })
    : ${APP_VAR_NAME}
  )).mount(document.body)
` as const
export const SCOPED_ID_CODE = `${APP_VAR_NAME}.__scopeId = "data-v-${REPO_NAME}"` as const
