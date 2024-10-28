export function parseTemplate(body: HTMLBodyElement) {
  const template = document.querySelector('head>template') as HTMLTemplateElement | undefined
  const templateContent = template?.content.cloneNode(true)
  template?.remove()
  body.replaceChildren(templateContent!)
  return template ? body : new Error('No template found')
}
