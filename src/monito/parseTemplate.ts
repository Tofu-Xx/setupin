export function parseTemplate(templateEl: Tag['template'] | undefined) {
  const templateContent = templateEl?.innerHTML ?? '{{"not found <template>"}}'
  templateEl?.remove()
  // const body = document.body ?? document.createElement('body')
  // body.innerHTML = templateContent
  // document.head.parentNode?.insertBefore(body, document.head.nextSibling)
  return templateContent?.replace(/[`"'$\\]/g, s => `\\${s}`)
}
