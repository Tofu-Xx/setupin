import type { SFCScriptBlock, SFCStyleCompileResults, SFCTemplateCompileResults } from '@vue/compiler-sfc'

export interface SFCAppBlock extends SFCScriptBlock {
  isScoped?: boolean
}
export interface CompiledSFC {
  sfcStyleCompileResultsList: SFCStyleCompileResults[]
  sfcAppBlock: SFCAppBlock
  sfcTemplateCompileResults: SFCTemplateCompileResults
}
export interface Info {
  id: string
  filename: string
}
