import type { Info, SFCAppBlock } from './types'
import { compileScript, type SFCDescriptor } from '@vue/compiler-sfc'

export function appCompiler(descriptor: SFCDescriptor, info: Info) {
  const sfcAppBlock: SFCAppBlock = compileScript(descriptor, {
    ...info,
    isProd: !__IS_DEV__,
  })
  sfcAppBlock.isScoped = descriptor.styles.some(s => s.scoped)
  return sfcAppBlock
}
