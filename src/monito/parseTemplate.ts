export function parseTemplate(templateEl: Tag['template'] | undefined) {
  const templateContent = templateEl?.innerHTML ?? '{{"not found <template>"}}'
  templateEl?.remove()
  return templateContent?.replace(/[`"'$\\]/g, s => `\\${s}`)
}
