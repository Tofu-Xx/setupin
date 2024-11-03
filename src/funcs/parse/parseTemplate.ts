export type parsedTemplate = ReturnType<typeof parseTemplate>
export function parseTemplate(templateEl?: Maybe<Tag['template']>) {
  const templateContent = templateEl?.innerHTML ?? '{{"not found <template>"}}'
  templateEl?.remove()
  return templateContent?.replace(/[`"'$\\]/g, s => `\\${s}`)
}
