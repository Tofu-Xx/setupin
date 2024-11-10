export function createDom(tag: string, innerHTML?: string) {
  const container = document.createElement('div')
  container.insertAdjacentHTML('afterbegin', tag)
  const sample = container.firstElementChild!
  const dom = document.createElement(sample.tagName)
  dom.innerHTML = innerHTML ?? ''
  for (const n of sample.getAttributeNames()) {
    dom.setAttribute(n, sample.getAttribute(n) ?? '')
  }
  return dom
}
