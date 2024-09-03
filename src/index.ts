import {
  type FunPocket,
  getExposedName,
  type Portal,
  proxyCall,
  truthCall,
} from "./tools";
import { Vue } from "./assets/vue.global.prod.js";

window["Vue"] = Vue;
Object.entries(Vue).forEach(([k, v]) => window[k] = v);

/*  */
const portal: Portal = proxyCall([
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

  const scriptElement = document.querySelector("script[setup]");
  const setupContent = scriptElement?.textContent || "";
  const exposedList = getExposedName(setupContent);

  Vue["createApp"]({
    setup() {
      truthCall(portal);
      return Object.fromEntries(
        exposedList.map((a) => [a, eval(a)]),
      );
    },
  }).mount("body");
});
