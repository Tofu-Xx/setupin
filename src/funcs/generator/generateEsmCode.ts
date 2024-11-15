import type { SFCAppBlock } from '@/compilerSfc/types'
import type { SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { APP_VAR_NAME, CREATE_APP_CODE, INIT_CODE, SCOPED_ID_CODE } from '@/data'

export function generateEsmCode(sfcAppBlock: SFCAppBlock, sfcTemplateCompileResults: SFCTemplateCompileResults) {
  const _scriptTransform = ({ content }: SFCAppBlock) => content
    .replace('export default', `${APP_VAR_NAME} =`)
    .replace(/Object\.defineProperty\(__returned__.*/, '')
  const _templateTransform = ({ code }: SFCTemplateCompileResults) => code
    .replace('export function render', `${APP_VAR_NAME}.render = function`)
  return [
    INIT_CODE,
    _scriptTransform(sfcAppBlock),
    _templateTransform(sfcTemplateCompileResults),
    sfcAppBlock.isScoped ? SCOPED_ID_CODE : '',
    CREATE_APP_CODE,
  ].join('\n')
}
