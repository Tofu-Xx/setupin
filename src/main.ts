import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'
import script from './demo.vue?vue&type=script'
import { render } from './demo.vue?vue&type=template&id=xxxxxx'
import './demo.vue?vue&type=style&index=0&id=xxxxxx'

script.render = render
script.__file = 'demo.vue'
export default script
// compileScript()
// compileStyle()
// compileTemplate()
