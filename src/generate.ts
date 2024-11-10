// import type { ParsedScript } from './parse'
// import logo from '@ascii-logo'
// import * as Vue from '@vue'

// export function generate(context: Omit<ParsedScript, 'scriptEl'>) {
//   const demandRex = new RegExp(`\\b${Object.keys(Vue).join('\\b|\\b')}\\b`, 'g')
//   const { importsCode, setupCode, retNames, isAsync } = context
//   const async = isAsync ? 'async' : ''
//   const appComp = `{template:document.body.innerHTML,${async} setup(){${setupCode}return{${retNames}}}}`
//   const suspenseComp = `{components:{c:${appComp}},template:'<Suspense><c/></Suspense>'}`
//   const createApp = `createApp(${isAsync ? suspenseComp : appComp}).mount(document.body);`
//   const autoImport = `const {createApp,${[...new Set(setupCode.match(demandRex))]}}=Vue;`
//   return (__IS_PROD__ ? '' : logo)
//     + importsCode
//     + autoImport
//     + createApp
// }

/*

<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue/dist/vue.runtime.esm-browser.js"
    }
  }
</script>
<script type="module">
  import { ref, useTemplateRef, onMounted } from 'vue';

  const AppComp = {
    __name: 'App',
    setup(__props, { expose: __expose }) {
      __expose();

      const msg = ref('setupin');
      const iptRef = useTemplateRef('ipt');
      onMounted(() => {
        iptRef.value.focus();
      });

      const __returned__ = { msg, iptRef };
      // Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
      return __returned__;
    }

  };

  import { vModelText as _vModelText, createElementVNode as _createElementVNode, withDirectives as _withDirectives, toDisplayString as _toDisplayString, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";

  AppComp.render = function (_ctx, _cache) {
    return (_openBlock(), _createElementBlock(_Fragment, null, [
      _withDirectives(_createElementVNode("input", {
        type: "text",
        ref: "ipt",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.msg) = $event))
      }, null, 512 ), [
        [_vModelText, _ctx.msg]
      ]),
      _createElementVNode("h1", null, _toDisplayString(_ctx.msg), 1)
    ], 64 ));
  };

  import { createApp } from 'vue';
  createApp(AppComp).mount(document.body)
</script>

<style>
  @import "https://unpkg.com/@tofukit/resetcss";
</style>

*/
