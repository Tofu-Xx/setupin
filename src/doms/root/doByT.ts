export type DoneByT = ReturnType<typeof doByT>
export function doByT(templateEl: Maybe<Tag['template']>) {
  const templateContent = templateEl?.innerHTML ?? '{{"not found <template>"}}'
  templateEl?.remove()
  // const body = document.body ?? document.createElement('body')
  // body.innerHTML = templateContent
  // document.head.parentNode?.insertBefore(body, document.head.nextSibling)
  return templateContent?.replace(/[`"'$\\]/g, s => `\\${s}`)
}
