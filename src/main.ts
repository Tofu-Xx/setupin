import { ImportsJSON, SetupinAttrName } from './data'
import { awaitCompileSfc } from './funcs/awaitCompileSfc'
import { generateEsmCode, generateStyleCode } from './funcs/generate'
import { createDom } from './utils/createDom'

function toHead(name: string, inner: string) {
  createDom({ name, inner }).mount(document.head)
}

awaitCompileSfc((compiledStyles, ...compiledSetupAndRender) => {
  toHead(`<script ${SetupinAttrName} type="importmap">`, ImportsJSON)
  toHead(`<script ${SetupinAttrName} type="module">`, generateEsmCode(...compiledSetupAndRender))
  toHead(`<style ${SetupinAttrName}>`, generateStyleCode(compiledStyles))
})
