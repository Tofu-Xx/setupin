export const imports = JSON.stringify({
  imports: {
    vue: 'https://unpkg.com/vue/dist/vue.runtime.esm-browser.js',
  },
})
export function generateEsmCode(scriptCode: string, templateCode: string) {
  return `
    ${scriptCode + templateCode}
    import { createApp } from "vue";
    createApp(__appcomp__).mount(document.body)
  `
}
