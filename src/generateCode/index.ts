export function generateCode(
  template: string,
  {
    importCode,
    setupCode,
    retNames,
    isAsync,
  }: Context,
) {
  return `
  ${importCode}
  const { ${Object.keys(window.Vue)} } = Vue
  createApp({
    template: \`${template}\`,
    ${isAsync ? 'async' : ''} setup(){
      ${setupCode}
      return {
        ${retNames}
      }
    }
  }).mount(document.body)
  `
}
