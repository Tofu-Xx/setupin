export function parseTemplate(body: HTMLBodyElement) {
  const template = document.querySelector('head>template')
  if (!template)
    throw new Error('No template found')
  const templateContent = (template as HTMLTemplateElement).content.cloneNode(true)
  template.remove()
  body.replaceChildren(templateContent)
  return body
}
