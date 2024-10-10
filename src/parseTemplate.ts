document.addEventListener('DOMContentLoaded', () => {
  const template = document.querySelector('head > template') as HTMLTemplateElement
  if (!template) {
    console.warn('No template found')
    return
  }
  const templateContent = template.content.cloneNode(true)
  document.body.replaceChildren(templateContent)
  document.body.setAttribute('data-setupin-template', '')
  template.remove()
})
