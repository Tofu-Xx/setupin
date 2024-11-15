import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'

export type SFCAppBlock = SFCScriptBlock & { isScoped?: boolean }
export interface CompiledSFC {
  sfcStyleCompileResultsList: SFCStyleCompileResults[]
  sfcAppBlock: SFCAppBlock
  sfcTemplateCompileResults: SFCTemplateCompileResults
}
export interface Info {
  id: string
  filename: string
}
