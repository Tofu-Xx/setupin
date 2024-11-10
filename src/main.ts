import { compiler } from './compiler'
import { ImportsJSON, SetupinAttrName } from './data'
import { generateEsmCode } from './generateEsmCode'
import { getSource } from './getSource'
import { scriptTransform, styleTransform, templateTransform } from './transform'
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
  const { sfcScriptBlock, sfcStyleCompileResultsList, sfcTemplateCompileResults } = compiler(sources.join('\n'))
  const styleCode = styleTransform(sfcStyleCompileResultsList)
  styleEl.innerHTML = styleCode
  const scriptCode = scriptTransform(sfcScriptBlock)
  const templateCode = templateTransform(sfcTemplateCompileResults)
  scriptEl.innerHTML = generateEsmCode(scriptCode, templateCode)
})()
