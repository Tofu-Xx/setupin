export function parseTemplate(templateEl: Tag['template'] | undefined) {
  if (!templateEl)
    return new Error('No template found')
  const templateContent = templateEl.innerHTML
  templateEl.remove()
  return templateContent.replace(/[`"'$\\]/g, s => `\\${s}`)
}
