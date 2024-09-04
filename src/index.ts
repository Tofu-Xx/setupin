import { getExposed, parseTemplate, proxyCall } from "./tools";
import { Vue } from "./assets/vue.global.prod.js";

window["Vue"] = Vue;
Object.entries(Vue).forEach(([k, v]) => window[k] = v);
const portal = proxyCall([
  "onMounted",
  "onUpdated",
  "onUnmounted",
  "onBeforeMount",
  "onBeforeUpdate",
  "onBeforeUnmount",
], Vue);
document.addEventListener("DOMContentLoaded", () => {
  parseTemplate();
  const scriptText = document.querySelector("script[setup]")?.textContent || "";
  const App = {
    setup() {
      portal.call();
      return getExposed(scriptText);
    },
  };
  Vue["createApp"](App).mount("body");
});
