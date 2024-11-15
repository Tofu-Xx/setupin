export function createDom(row: string, inner?: string) {
  const container = document.createElement('body')
  container.insertAdjacentHTML('afterbegin', row)
  const sample = container.firstElementChild
  if (!sample) return { mount: () => {} }
  const dom = document.createElement(sample.tagName)
  dom.innerHTML = inner ?? sample.innerHTML
  for (const n of sample.getAttributeNames()) {
    dom.setAttribute(n, sample.getAttribute(n) ?? '')
  }
  return {
    mount: (el: Element) => el.appendChild(dom),
  }
}
