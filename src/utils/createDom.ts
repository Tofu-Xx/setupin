export function createDom(html: string) {
  const container = document.createElement('div')
  container.insertAdjacentHTML('afterbegin', html)
  const sample = container.firstElementChild!
  const dom = document.createElement(sample.tagName)
  for (const n of sample.getAttributeNames()) {
    dom.setAttribute(n, sample.getAttribute(n) ?? '')
  }
  return dom
}
