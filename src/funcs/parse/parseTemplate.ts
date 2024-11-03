export type ParsedTemplate = ReturnType<typeof parseTemplate>
export function parseTemplate(templateEl?: Maybe<Tag['template']>) {
  const templateContent = templateEl?.innerHTML ?? '{{"not found <template>"}}'
  templateEl?.remove()
  return templateContent
}
