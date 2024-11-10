import { MagicString, rewriteDefault, walk, walkIdentifiers } from 'vue/compiler-sfc'
import { compiler } from './compiler'
import { getSource } from './getSource'
import { watchRoot } from './utils';

(async () => {
  const sources = await watchRoot(getSource)
  const { sfcScriptBlock, sfcStyleCompileResultsList, sfcTemplateCompileResults } = compiler(sources.join('\n'))

  const styleCode = sfcStyleCompileResultsList.map(style => style.code).join('\n')

  const s = new MagicString(sfcScriptBlock.content)
  s
    .replace('export default', 'const AppComp =')
    .prependLeft(sfcScriptBlock.content.indexOf('Object.defineProperty(__returned__'), '//')
  const scriptCode = s.toString()
  /* template */
  const t = new MagicString(sfcTemplateCompileResults.code)
  t.replace('export function render', 'AppComp.render = function')
  const templateCode = t.toString()

  const generatedCode = `
    <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue/dist/vue.runtime.esm-browser.js"
      }
    }
    </script>
    <script data-setupin type="module">
      ${scriptCode}
      ${templateCode}
      import { createApp } from 'vue';
      createApp(AppComp).mount(document.body)
    </script>
    <style data-setupin>
      ${styleCode}
    </style>
`
  document.head.insertAdjacentHTML('beforeend', generatedCode)
  // console.log(generatedCode)
})()
