import { IMPORTS_CODE, REPO_NAME } from '@/data'
import { awaitCompileSfc, generator } from '@/funcs'
import { createDom } from '@/utils'

awaitCompileSfc((compiledSfc) => {
  const _toHead = (...args: [string, string?]) => createDom(...args).mount(document.head)
  const g = generator(compiledSfc)
  _toHead(`<script ${REPO_NAME} type="importmap">${IMPORTS_CODE}</script>`)
  _toHead(`<script ${REPO_NAME} type="module">`, g.esmCode)
  _toHead(`<style ${REPO_NAME}>`, g.cssCode)
})
