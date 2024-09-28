export function proxyCall(fnNameList: string[], truthThis: object, proxyThis: object = globalThis) {
  const funPocket: { [key: string]: any[][] } = {}
  const _transport = (fnName: string) => {
    funPocket[fnName] = []
    eval(`${fnName} = (...args) => funPocket[fnName].push(args)`)
    return eval(fnName) as () => any
  }
  fnNameList.forEach(k => proxyThis[k] = _transport(k))
  return {
    call() {
      Object.entries(funPocket).forEach(([vueFnName, argsArr]) => {
        argsArr.forEach((args) => {
          truthThis[vueFnName](...args)
        })
        proxyThis[vueFnName] = truthThis[vueFnName]
      })
    },
  }
}
