export function proxyCall(
  funNameList: string[],
  truthCallThis: object,
  proxyCallThis: object = window,
) {
  const funPocket: { [key: string]: any[][] } = {};
  function _transport(fnStr: string) {
    funPocket[fnStr] = [];
    eval(`${fnStr} = (...args) => funPocket[fnStr].push(args)`);
    return eval(fnStr);
  }
  funNameList.forEach((k) => proxyCallThis[k] = _transport(k));
  return {
    truthCallThis,
    proxyCallThis,
    call() {
      Object.entries(funPocket).forEach(([vueFnName, argsArr]) => {
        argsArr.forEach((args) => {
          truthCallThis[vueFnName](...args);
        });
        proxyCallThis[vueFnName] = truthCallThis[vueFnName];
      });
    },
  };
}


