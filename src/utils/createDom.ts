export interface CreateDomOptions {
  name: string
  inner?: string
}
export function createDom({ name, inner }: CreateDomOptions) {
  const container = document.createElement('div')
  container.insertAdjacentHTML('afterbegin', name)
  const sample = container.firstElementChild!
  const dom = document.createElement(sample.tagName)
  dom.innerHTML = inner ?? ''
  for (const n of sample.getAttributeNames()) {
    dom.setAttribute(n, sample.getAttribute(n) ?? '')
  }
  return {
    mount(el: Element) {
      el.appendChild(dom)
    },
  }
}
