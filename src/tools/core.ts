export function getExposedName(scriptContent: string) {
  const globalVarRegex =
    /(?:let|const|function)\s+\[?\{?\s*([a-zA-Z_$][\w$,\s]*)\b/g;
  return [...scriptContent.matchAll(globalVarRegex)]
    .flatMap((match) => match[1].split(",").map((v) => v.trim()))
    .filter((el) => {
      try {
        eval(el);
      } catch (e) {
        return false;
      }
      return true;
    });
}
/*  */
export interface FunPocket {
  [key: string]: any[][];
}
export interface Portal {
  funPocket: FunPocket;
  truthCallThis: object;
  proxyCallThis: object;
}
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
  return { funPocket, truthCallThis, proxyCallThis } as Portal;
}

export function truthCall(
  { funPocket, truthCallThis, proxyCallThis }: Portal,
) {
  Object.entries(funPocket).forEach(([vueFnName, argsArr]) => {
    argsArr.forEach((args) => {
      truthCallThis[vueFnName](...args);
    });
    proxyCallThis[vueFnName] = truthCallThis[vueFnName];
  });
}
