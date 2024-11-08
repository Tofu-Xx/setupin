// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  formatters: true,
  markdown: true,
  rules: {
    'format/prettier': 'off',
  },
})
