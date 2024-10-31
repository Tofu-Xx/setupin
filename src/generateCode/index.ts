export function generateCode(
  template: string,
  {
    importCode,
    setupCode,
    retNames,
    isAsync,
  }: Context,
) {
  const suspense = `{
    components: { AsyncComp },
    template: \`<Suspense><AsyncComp /></Suspense>\`,
  }`
  const app = `{
    template: \`${template}\`,
    ${isAsync ? 'async' : ''} setup() {
      ${setupCode}
      return {
        ${retNames}
      }
    },
  }`
  const statementAsync = isAsync ? `const AsyncComp = ${app}` : ''
  return `
  ${importCode}
  const { ${Object.keys(window.Vue)} } = Vue;
  ${statementAsync}
  createApp(${isAsync ? suspense : app}).mount(document.body);
  `
}
