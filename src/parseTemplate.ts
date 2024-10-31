// export function parseTemplate(body: Tag['body']) {
//   const template = document.querySelector('head>template') as Tag['template'] | null
//   const templateContent = template?.content.cloneNode(true)
//   template?.remove()
//   body?.replaceChildren(templateContent ?? '')
//   return template ? body : new Error('No template found')
// }

export function parseTemplate(templateEl: Tag['template'] | undefined) {
  if (!templateEl)
    return new Error('No template found')
  const templateContent = templateEl.innerHTML
  templateEl.remove()
  return templateContent
  // const body = document.body ?? document.createElement('body')
  // body?.replaceChildren(templateContent ?? '')
  // console.log(body)
  // if (!document.body)
  // document.appendChild(body)
}
