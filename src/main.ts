import asciiLogo from '@/assets/ascii-logo.txt?raw'
import { useXxx2x } from 'sfc2esm'
import { awaitClientCode } from './awaitClientCode'
import { createDom } from './utils'

awaitClientCode((sfcCode) => {
  const site = document[__IS_DEV__ ? 'head' : 'body']
  const { esm, css } = useXxx2x({ id: 'setupin', appName: 'APP$' }).sfc2x(sfcCode, 'body')
  createDom('<script type="importmap">', JSON.stringify({ imports: { vue: __VUE_URL__ } }))?.mount(site)
  createDom('<script type="module">', asciiLogo + esm)?.mount(site)
  createDom(css && '<style>', css)?.mount(document.head)
})
