import { awaitCompiledSfc } from './awaitCompiledSfc'
import { ImportsJSON, SetupinAttrName } from './data'
import { generateEsmCode, generateStyleCode } from './generate'
import { createDom } from './utils/createDom'

createDom({
  name: `<script ${SetupinAttrName} type="importmap">`,
  inner: ImportsJSON,
}).mount(document.head)

awaitCompiledSfc((compiledStyles, ...compiledSetupAndRender) => {
  createDom({
    name: `<script ${SetupinAttrName} type="module">`,
    inner: generateEsmCode(...compiledSetupAndRender),
  }).mount(document.head)

  createDom({
    name: `<style ${SetupinAttrName}>`,
    inner: generateStyleCode(compiledStyles),
  }).mount(document.head)
})
