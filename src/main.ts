import { ImportsJSON, SetupinAttrName } from './data'
import { awaitCompileSfc } from './funcs/awaitCompileSfc'
import { generateEsmCode, generateStyleCode } from './funcs/generate'
import { createDom } from './utils/createDom'

awaitCompileSfc((compiledStyles, ...compiledSetupAndRender) => {
  _toHead(`<script ${SetupinAttrName} type="importmap">${ImportsJSON}</script>`)
  _toHead(`<script ${SetupinAttrName} type="module">`, generateEsmCode(...compiledSetupAndRender))
  _toHead(`<style ${SetupinAttrName}>`, generateStyleCode(compiledStyles))
})

function _toHead(...args: [string, string?]) {
  createDom(...args).mount(document.head)
}
