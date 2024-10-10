// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  formatters: true,
  markdown: true,
  rules: {
    'regexp/no-super-linear-backtracking': 'off',
    'no-new-func': 'off',
    'format/prettier': 'off',
    'antfu/if-newline': 'off',
  },
})
