type FnName = string

type Args = any[]
type Ret = any
interface Call {
  args: Args
  ret: Ret
}

export function proxyCall(fnNameList: FnName[], truthThis: object, proxyThis: object = window) {
  const funPocket: Record<FnName, Call[]> = {}
  const _transport = (fnName: string) => {
    funPocket[fnName] = []
    proxyThis[fnName] = (...args) => {
      const count = funPocket[fnName].push({ args, ret: void 0 })
      return window.computed(() => funPocket[fnName][count - 1].ret)
    }
    return proxyThis[fnName]
  }
  fnNameList.forEach(k => proxyThis[k] = _transport(k))

  return {
    call() {
      Object.entries(funPocket).forEach(([fnName, calls]) => {
        calls.forEach((call) => {
          call.ret = truthThis[fnName](...call.args)
        })
        proxyThis[fnName] = truthThis[fnName]
      })
    },
  }
}
