// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  typescript: true,
  formatters: true,
  markdown: true,
  rules: {
    'format/prettier': 'off',
    'ts/explicit-function-return-type': 'off',
  },
})
