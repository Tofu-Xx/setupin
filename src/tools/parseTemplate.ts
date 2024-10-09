import { once } from './once'

export const parseTemplate = once(() => {
  const template = document.querySelector('template')
  if (!template) {
    console.warn('No template found')
    return
  }
  const templateContent = template.content.cloneNode(true)
  document.body.replaceChildren(templateContent)
  template.remove()
})
