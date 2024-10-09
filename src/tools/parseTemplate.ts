let parsed = false
export function parseTemplate(): void {
  if (parsed) return void 0
  const template = document.querySelector('template')
  if (!template) {
    console.warn('No template tag found.')
    return void 0
  }
  const templateContent = template.content.cloneNode(true)
  document.body.replaceChildren(templateContent)
  template.remove()
  parsed = true
}
