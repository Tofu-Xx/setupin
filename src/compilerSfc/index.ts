import type { SFCTemplateCompileOptions } from 'vue/compiler-sfc'
import { INIT_CODE, REPO_NAME } from '@/data'
import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'

const filename = `${REPO_NAME}.vue`
const id = REPO_NAME
export function compilerSfc(source: string) {
  const sfcParseResult = parse(source, { filename })
  sfcParseResult.errors.forEach((e) => {
    console.warn(e)
  })
  // console.log(sfcParseResult.descriptor)
  // type A = Array<keyof SFCTemplateCompileOptions>
  // const a: A = ['preprocessCustomRequire']
  /* */
  const sfcScriptBlock = compileScript(sfcParseResult.descriptor, { id, isProd: !__IS_DEV__ })
  const sfcTemplateCompileResults = compileTemplate({
    id,
    filename,
    source: sfcParseResult.descriptor.template?.content ?? '',
    isProd: !__IS_DEV__,
    // preprocessCustomRequire: id => `data-v-${id}`,
  })
  const sfcStyleCompileResultsList = sfcParseResult.descriptor.styles.map((style) => {
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
