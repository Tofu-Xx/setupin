import { getExposedName, transport } from "./tools";


const SETUP_VUE = (window as any).Vue;

Object.entries(SETUP_VUE).forEach(([k, v]) => window[k] = v);
/*  */
const funPocket = transport([
  "onMounted",
  "onUpdated",
  "onUnmounted",
  "onBeforeMount",
  "onBeforeUpdate",
  "onBeforeUnmount",
]);
/*  */
/*  */
document.addEventListener("DOMContentLoaded", () => {
  const scriptElement = document.querySelector("script[setup]");
  const setupContent = scriptElement?.textContent || "";
  (() => {
    const template = document.querySelector("template");
    if (!template) {
      throw new Error("No template found.");
    };
    console.log(document.body.innerHTML)
    const templateStr = template!.innerHTML
    template?.remove()
    document.body.innerHTML = templateStr;
  })();
  

  const exposedList = getExposedName(setupContent);

  SETUP_VUE.createApp({
    setup: () => {
      Object.entries(funPocket).forEach(([vueFnName, argsArr]) => {
        argsArr.forEach((args) => {
          SETUP_VUE[vueFnName](...args);
        });
        window[vueFnName] = SETUP_VUE[vueFnName];
      });

      return Object.fromEntries(
        exposedList.map((a) => [a, eval(a)]),
      );
    },
  }).mount('body');
});
