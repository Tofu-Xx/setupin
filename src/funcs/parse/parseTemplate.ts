export type ParsedTemplate = ReturnType<typeof parseTemplate>
export function parseTemplate(templateEl?: Maybe<Tag['template']>) {
  const templateContent = templateEl?.innerHTML ?? 'not found &lt;template&gt;'
  templateEl?.remove()
  return templateContent
}
