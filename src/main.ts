import { useXxx2x } from 'sfc2esm'
import { awaitClientCode } from './awaitCompileSfc'
import { ASCII_LOGO, IMPORTS_TAG_CODE, REPO_NAME } from './data'
import { createDom } from './utils'

awaitClientCode((sfcCode) => {
  const site = document[__IS_DEV__ ? 'head' : 'body']
  const { esm, css } = useXxx2x({ id: REPO_NAME, appName: 'APP$' }).sfc2x(sfcCode, 'body')
  createDom(IMPORTS_TAG_CODE)?.mount(site)
  createDom(`<script ${REPO_NAME} type="module">`, ASCII_LOGO + esm)?.mount(site)
  createDom(css && `<style ${REPO_NAME}>`, css)?.mount(document.head)
})
