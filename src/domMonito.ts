import { parseScript } from './parseScript'
import { parseTemplate } from './parseTemplate'

type Data = [ReturnType<typeof parseScript>, ReturnType<typeof parseTemplate>]
export function domMonito(): Promise<Data> {
  const data: Data = [void 0, void 0] as unknown as Data
  const isFull = () => data.every(e => e !== void 0)
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.tagName === 'SCRIPT' && node.hasAttribute('setup')) {
              if (node.parentNode !== document.head) {
                node.textContent = '/* Resolved to the wrong location */'
              }
              else {
                if (data[0] !== void 0)
                  return
                data[0] = parseScript(node as Tag['script'])
                console.log('script')
                if (isFull())
                  resolve(data)
              }
            }
            if (node.tagName === 'TEMPLATE' && node.parentNode === document.head) {
              if (data[1] !== void 0)
                return
              data[1] = parseTemplate(node as Tag['template'])
              console.log('template')
              if (isFull())
                resolve(data)
            }
          }
        })
      }
    })
    observer.observe(document, {
      childList: true,
      subtree: true,
    })
    document.addEventListener('DOMContentLoaded', () => {
      if (data[0] === void 0) {
        console.warn('not found <script setup> in root node')
        data[0] = parseScript(void 0)
        if (isFull())
          resolve(data)
      }
      if (data[1] === void 0) {
        console.error('not found <template> in root node')
        data[1] = parseTemplate(void 0)
        if (isFull())
          resolve(data)
      }
      observer.disconnect()
    })
  })
}
