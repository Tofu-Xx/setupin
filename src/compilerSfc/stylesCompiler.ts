import type { Info } from './types'
import { compileStyle, type SFCStyleBlock } from '@vue/compiler-sfc'

export function stylesCompiler(styles: SFCStyleBlock[], info: Info) {
  return styles.map((style) => {
    const sfcStyleCompileResults = compileStyle({
      ...info,
      source: style.content,
      scoped: style.scoped,
      isProd: !__IS_DEV__,
    })
    sfcStyleCompileResults.errors.forEach(e => console.warn(e))
    return sfcStyleCompileResults
  })
}
