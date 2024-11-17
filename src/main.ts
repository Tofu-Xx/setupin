import asciiLogo from '@/assets/ascii-logo.txt?raw'
import { useXxx2x } from 'sfc2esm'
import { awaitClientCode } from './awaitClientCode'
import { IMPORTS_TAG_CODE, REPO_NAME } from './data'
import { createDom } from './utils'

awaitClientCode((sfcCode) => {
  const site = document[__IS_DEV__ ? 'head' : 'body']
  const { esm, css } = useXxx2x({ id: REPO_NAME, appName: 'APP$' }).sfc2x(sfcCode, 'body')
  createDom(IMPORTS_TAG_CODE)?.mount(site)
  createDom(`<script ${REPO_NAME} type="module">`, asciiLogo + esm)?.mount(site)
  createDom(css && `<style ${REPO_NAME}>`, css)?.mount(document.head)
})
