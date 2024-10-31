export function parseTemplate(templateEl: Tag['template'] | undefined) {
  if (!templateEl) {
    return () => {
      console.error('No template found')
      return ''
    }
  }
  const templateContent = templateEl.innerHTML
  templateEl.remove()
  return templateContent.replace(/[`"'$\\]/g, s => `\\${s}`)
}
