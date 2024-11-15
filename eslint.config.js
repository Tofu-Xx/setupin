// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  typescript: true,
  vue: true,
  formatters: true,
  markdown: true,
  rules: {
    'format/prettier': 'off',
    'ts/explicit-function-return-type': 'off',
    'antfu/if-newline': 'off',
    'antfu/curly': 'off',
  },
})
