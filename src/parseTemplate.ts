export function parseTemplate(body: Tag['body']) {
  const template = document.querySelector('head>template') as Tag['template'] | null
  const templateContent = template?.content.cloneNode(true)
  template?.remove()
  body.replaceChildren(templateContent ?? '')
  return template ? body : new Error('No template found')
}
