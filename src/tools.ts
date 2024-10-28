export function when(unknow: any) {
  return (types: Record<string, any>) => types[unknow in types ? unknow : 'default']?.()
}

export function loaded(callback: () => void) {
  document.addEventListener('DOMContentLoaded', callback)
}
