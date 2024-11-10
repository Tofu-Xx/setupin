export function generateEsmCode(scriptCode: string, templateCode: string) {
  return `
    ${scriptCode}
    ${templateCode}
    import { createApp } from "vue";
    createApp(__appcomp__).mount(document.body)
  `
}
