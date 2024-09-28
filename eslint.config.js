// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  formatters: true,
  rules: {
    'regexp/no-super-linear-backtracking': 'off',
    'no-eval': 'off',
    'antfu/if-newline': 'off',
  },
})
