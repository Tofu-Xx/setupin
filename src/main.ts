import { compileScript, compileStyle, compileTemplate, parse } from 'vue/compiler-sfc'
const source = `
<script setup lang="ts">
const count = ref(0)
</script>

<template>
  <button @click="count++">
    {{ count }}
  </button>
</template>

<style scoped>
  button {
    background-color: #6af;
    color: #fff;
    font-weight: bolder;
  }
</style>
`
/*  */
const parsed = parse(source, {
  filename: 'App.vue',
})
console.log('parsed', parsed)
/* template */
const compileredTemplate = compileTemplate({
  id: 'setupin',
  filename: 'App.vue',
  source: parsed.descriptor.template?.content ?? '',
})
console.log('template', compileredTemplate)
/* script */
const compileredScript = compileScript(parsed.descriptor, {
  id: 'setupin',
})
console.log('script', compileredScript)
/* style */
const compileredStyles = parsed.descriptor.styles.map((style, i) => {
  return compileStyle({
    id: `setupin-style-${i + 1}`,
    filename: 'App.vue',
    source: style.content,
    scoped: style.scoped,
  })
})
console.log('styles', compileredStyles)
