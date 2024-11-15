import { IMPORTS_TAG_CODE, REPO_NAME } from '@/data'
import { awaitCompileSfc, generator } from '@/funcs'
import { createDom } from '@/utils'

awaitCompileSfc((compiledSfc) => {
  const site = document[__IS_DEV__ ? 'head' : 'body']
  const { cssCode, esmCode } = generator(compiledSfc)
  createDom(IMPORTS_TAG_CODE)?.mount(site)
  createDom(`<script ${REPO_NAME} type="module">`, esmCode)?.mount(site)
  createDom(cssCode && `<style ${REPO_NAME}>`, cssCode)?.mount(document.head)
})
