import { getExposed, proxyCall, truthCall } from "./tools";
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
  (() => {
    const template = document.querySelector("template");
    if (!template) {
      throw new Error("No template found.");
    }
    const templateStr = template!.innerHTML;
    template?.remove();
    document.body.innerHTML = templateStr;
  })();

  const setupContent = document.querySelector("script[setup]")?.textContent;

  Vue["createApp"]({
    setup() {
      truthCall(portal);
      return getExposed(setupContent);
    },
  }).mount("body");
});
