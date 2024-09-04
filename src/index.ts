import { getExposed, getMode, proxyCall, truthCall } from "./tools";
import { getScriptText } from "./mode";
import { Vue } from "./assets/vue.global.prod.js";

window["Vue"] = Vue;
Object.entries(Vue).forEach(([k, v]) => window[k] = v);

/*  */
const portal = proxyCall([
  "onMounted",
  "onUpdated",
  "onUnmounted",
  "onBeforeMount",
  "onBeforeUpdate",
  "onBeforeUnmount",
], Vue);
/*  */
/*  */
document.addEventListener("DOMContentLoaded", () => {
  const mode = getMode();
  console.log(mode);
  (() => {
    const template = document.querySelector("template");
    if (!template) {
      throw new Error("No template found.");
    }
    const templateStr = template!.innerHTML;
    template?.remove();
    document.body.innerHTML = templateStr;
  })();
  
  const scriptText = getScriptText(mode);
  Vue["createApp"]({
    setup() {
      mode === "in" ? eval(scriptText) : truthCall(portal);
      return getExposed(scriptText);
    },
  }).mount("body");
});
