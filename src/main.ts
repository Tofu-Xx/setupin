import { IMPORTS_TAG_CODE, REPO_NAME } from '@/data'
import { awaitCompileSfc, generator } from '@/funcs'
import { createDom } from '@/utils'

awaitCompileSfc((compiledSfc) => {
  const _toHead = (...args: [string, string?]) => createDom(...args)?.mount(document.head)
  const { cssCode, esmCode } = generator(compiledSfc)
  _toHead(IMPORTS_TAG_CODE)
  _toHead(`<script ${REPO_NAME} type="module">`, esmCode)
  _toHead(cssCode && `<style ${REPO_NAME}>`, cssCode)
})
