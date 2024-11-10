export function createDom(row: string, inner?: string) {
  const container = document.createElement('div')
  container.insertAdjacentHTML('afterbegin', row)
  const sample = container.firstElementChild!
  const dom = document.createElement(sample.tagName)
  dom.innerHTML = inner ?? sample.innerHTML
  for (const n of sample.getAttributeNames()) {
    dom.setAttribute(n, sample.getAttribute(n) ?? '')
  }
  return {
    mount(el: Element) {
      el.appendChild(dom)
    },
  }
}
