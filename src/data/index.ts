export { default as ASCII_LOGO } from '@/assets/ascii-logo.txt?raw'

export const REPO_NAME = 'setupin'
export const IMPORTS_TAG_CODE = `
<script ${REPO_NAME} type="importmap">
  ${JSON.stringify({ imports: { vue: __VUE_URL__ } })}
</script>
` as const
