// document.addEventListener('DOMContentLoaded', () => {
//   const template = document.querySelector('head > template') as HTMLTemplateElement
//   if (!template) {
//     console.warn('No template found')
//     return
//   }
//   const templateContent = template.content.cloneNode(true)
//   document.body.replaceChildren(templateContent)
//   document.body.setAttribute('data-setupin-template', '')
//   template.remove()
// })

new MutationObserver((mutations, observer) => {
  for (const mutation of mutations) {
    const template = (mutation.target as HTMLElement).querySelector('template')
    if (template && document.body) {
      const templateContent = template.content.cloneNode(true)
      document.body.replaceChildren(templateContent)
      document.body.setAttribute('data-setupin-template', '')
      template.remove()
      observer.disconnect()
    }
  }
}).observe(document, {
  childList: true,
  subtree: true,
})
