type FnName = string
export function proxyCall(fnNameList: FnName[], truthThis: object, proxyThis: object = window) {
  const funPocket: { [key: string]: any[][] } = {}
  const _transport = (fnName: string) => {
    funPocket[fnName] = []
    proxyThis[fnName] = (...args) => {
      funPocket[fnName].push(args)
    }
    return proxyThis[fnName]
  }
  fnNameList.forEach(k => proxyThis[k] = _transport(k))
  return {
    call() {
      Object.entries(funPocket).forEach(([fnName, calls]) => {
        calls.forEach((args) => {
          truthThis[fnName](...args)
        })
        proxyThis[fnName] = truthThis[fnName]
      })
    },
  }
}
