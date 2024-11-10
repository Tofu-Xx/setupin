export function createDom(html: string): Element {
  const container = document.createElement('div')
  container.insertAdjacentHTML('afterbegin', html)
  return container.firstElementChild!
}
