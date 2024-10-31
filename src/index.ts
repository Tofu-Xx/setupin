import { observe } from './observe'
import { parseSetup } from './parseSetup'
import { parseTemplate } from './parseTemplate'

observe({
  'body': parseTemplate,
  'script[setup]': parseSetup,
})
