import { once } from './once'

export const parseTemplate = once((template) => {
  const templateContent = template.content.cloneNode(true)
  document.body.replaceChildren(templateContent)
  template.remove()
})
