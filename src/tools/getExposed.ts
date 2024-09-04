function getExposedName(scriptContent: string) {
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

export function getExposed(setupContent) {
  return Object.fromEntries(
    getExposedName(setupContent || "").map((a) => [a, eval(a)]),
  );
}
