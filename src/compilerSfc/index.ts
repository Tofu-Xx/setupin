import { REPO_NAME } from '@/data'
import { compileScript, compileStyle, compileTemplate, parse } from '@vue/compiler-sfc'

const filename = `${REPO_NAME}.vue`
const id = REPO_NAME
export function compilerSfc(source: string) {
  const sfcParseResult = parse(source, { filename })
  sfcParseResult.errors.forEach((e) => {
    console.warn(e)
  })
  /* script */
  const sfcScriptBlock = compileScript(sfcParseResult.descriptor, { id, isProd: !__IS_DEV__ })
  /* template */
  const hasScoped = sfcParseResult.descriptor.styles.some(s => s.scoped)
  const sfcTemplateCompileResults = compileTemplate({
    id,
    filename,
    source: sfcParseResult.descriptor.template?.content ?? '',
    isProd: !__IS_DEV__,
    scoped: hasScoped,
    compilerOptions: {
      scopeId: hasScoped ? `data-v-${id}` : undefined,
    },
  })
  /* style */
  const sfcStyleCompileResultsList = sfcParseResult.descriptor.styles.map((style) => {
    // const s = sfcParseResult.descriptor as SFCDescriptor
    return compileStyle({
      id,
      filename,
      source: style.content,
      scoped: style.scoped,
      isProd: !__IS_DEV__,
    })
  })
  return {
    sfcScriptBlock,
    sfcTemplateCompileResults,
    sfcStyleCompileResultsList,
  }
}
