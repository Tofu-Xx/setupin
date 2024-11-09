import { compiler } from './compiler'
import { getSource } from './getSource'
import { watchRoot } from './util';

(async () => {
  const sources = await watchRoot(getSource)
  console.log(sources.join('\n'))
  compiler(sources.join('\n'))
})()
