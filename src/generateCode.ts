export function generateCode(template: string, ctx: Context) {
  const { importsCode, setupCode, retNames, isAsync } = ctx
  const appComp = `{
    template: \`${template}\`,
    ${isAsync ? 'async' : ''} setup() {${setupCode}return {${retNames}}},
  }`
  const suspenseComp = `{components:{c:${appComp}},template:'<Suspense><c/></Suspense>'}`
  const createApp = `createApp(${isAsync ? suspenseComp : appComp}).mount(document.body);`
  const autoImport = `const { ${Object.keys(window.Vue)} } = Vue;`
  return importsCode
    + autoImport
    + createApp
}
