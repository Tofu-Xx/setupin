export const injectVue = async () => {
  const vueCode =
    await (await fetch("https://unpkg.com/vue@3/dist/vue.global.prod.js"))
      .text();
  eval(vueCode);
  /* @ts-ignore */
  return Vue;
};
