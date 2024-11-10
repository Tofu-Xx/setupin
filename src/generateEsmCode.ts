import { AppVarName } from './data'

export function generateEsmCode(scriptCode: string, templateCode: string) {
  return `
    ${scriptCode}
    ${templateCode}
    import { createApp } from "vue";
    createApp(${AppVarName}).mount(document.body)
  `
}
