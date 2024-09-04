export function getScriptText(mode: string) {
  const dictionaries = {
    "setup": "script[setup]",
    "in": "script[src*='setupin']",
  };
  const selector = dictionaries[mode];
  return document.querySelector(selector)!.textContent;
}
