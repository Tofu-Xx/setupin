import { getSource } from './getSource'
import { watchRoot } from './utils'
import { createDom } from './utils/createDom'

// (async () => {
// /* const sources = */ await watchRoot(getSource)
const sel = createDom('<script>')
document.head.appendChild(sel)
sel.textContent = 'console.log("Hello World")'
// })()
