import ASCII_LOGO from '@/assets/ascii-logo.txt?raw'

export const APP_VAR_NAME = 'APP$'
export const REPO_NAME = 'setupin'
/* code */
export const IMPORTS_TAG_CODE = `
<script ${REPO_NAME} type="importmap">
  ${JSON.stringify({ imports: { vue: __VUE_URL__ } })}
</script>
` as const
// ${__IS_DEV__ ? ASCII_LOGO : ''}
export const INIT_CODE = `
  ${ASCII_LOGO}
  let ${APP_VAR_NAME} = {}
` as const
export const CREATE_APP_CODE = `
  import { createApp as _createApp, defineComponent as _defineComponent, h as _h, Suspense as _Suspense } from 'vue'
  _createApp(_defineComponent(
    String(${APP_VAR_NAME}.setup).startsWith('async')
    ? () => () => _h(_Suspense, null, { 
      default: _h(${APP_VAR_NAME}),
      fallback: _h('div', 'Loading...'),
    })
    : ${APP_VAR_NAME}
  )).mount(document.body)
` as const
export const SCOPED_ID_CODE = `${APP_VAR_NAME}.__scopeId = "data-v-${REPO_NAME}"` as const
