import { once } from '../tools'

export const parseTemplate = once(_parseTemplate)

function _parseTemplate(templateEl: Tag['template'] | undefined) {
  const templateContent = templateEl?.innerHTML ?? '{{"not found <template>"}}'
  templateEl?.remove()
  // const body = document.body ?? document.createElement('body')
  // body.innerHTML = templateContent
  // document.head.parentNode?.insertBefore(body, document.head.nextSibling)
  return templateContent?.replace(/[`"'$\\]/g, s => `\\${s}`)
}
