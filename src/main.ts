import { compiler } from './compiler'
import { ImportsJSON, SetupinAttrName } from './data'
import { generateEsmCode, generateStyleCode } from './generate'
import { getSource } from './getSource'
import { watchRoot } from './utils'
import { createDom } from './utils/createDom'

const importMapEl = createDom(`<script ${SetupinAttrName} type="importmap">`, ImportsJSON)
document.head.appendChild(importMapEl)
const scriptEl = createDom(`<script ${SetupinAttrName} type="module">`)
document.head.appendChild(scriptEl)
const styleEl = createDom(`<style ${SetupinAttrName}>`)
document.head.appendChild(styleEl)
;
(async () => {
  const sources = await watchRoot(getSource)
  const { sfcStyleCompileResultsList, sfcScriptBlock, sfcTemplateCompileResults } = compiler(sources.join('\n'))
  styleEl.innerHTML = generateStyleCode(sfcStyleCompileResultsList)
  scriptEl.innerHTML = generateEsmCode(sfcScriptBlock, sfcTemplateCompileResults)
})()
