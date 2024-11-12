import { IMPORTS_JSON, REPO_NAME } from '@/data'
import { awaitCompileSfc, generateEsmCode, generateStyleCode } from '@/funcs'
import { createDom } from '@/utils'

awaitCompileSfc((compiledStyleList, ...compiledSetupAndRender) => {
  _toHead(`<script ${REPO_NAME} type="importmap">${IMPORTS_JSON}</script>`)
  _toHead(`<script ${REPO_NAME} type="module">`, generateEsmCode(...compiledSetupAndRender))
  _toHead(`<style ${REPO_NAME}>`, generateStyleCode(compiledStyleList))
})

function _toHead(...args: [string, string?]) {
  createDom(...args).mount(document.head)
}
