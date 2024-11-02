// import { once } from '../tools'

export function doByT(templateEl: Option<Tag['template']>) {
  const templateContent = templateEl?.innerHTML ?? '{{"not found <template>"}}'
  templateEl?.remove()
  // const body = document.body ?? document.createElement('body')
  // body.innerHTML = templateContent
  // document.head.parentNode?.insertBefore(body, document.head.nextSibling)
  return templateContent?.replace(/[`"'$\\]/g, s => `\\${s}`)
}

// export const doByT = once(_doByT)
export type DoneByT = ReturnType<typeof doByT>
