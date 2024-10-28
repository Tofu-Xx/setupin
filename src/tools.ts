export function when(unknow: any) {
  return (types: Record<string, any>) => types[unknow in types ? unknow : 'default']?.()
}
