export function parseTemplate(body: HTMLBodyElement) {
  const template = document.querySelector('head>template') as HTMLTemplateElement | undefined
  if (!template)
    throw new Error('No template found')
  const templateContent = template.content.cloneNode(true)
  template.remove()
  body.replaceChildren(templateContent)
  return body
}
