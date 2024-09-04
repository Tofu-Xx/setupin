# Setupin

## 🤔 what is setupin
setup in html.
setupin lets you write vue's `<script setup>` in html.
## 😝 playground
[stackblitz](https://stackblitz.com/edit/stackblitz-starters-u6wftp?file=index.html)
## 🤯 setupin vs setup
- setup.vue

```vue
<script setup>
  import { ref, onMounted } from 'vue';
  const msg = ref('Hello World');
  const iptRef = ref(null);
  onMounted(() => {
    iptRef.value.focus();
  })
</script>

<template>
  <input ref="iptRef" v-model="msg">
  <h1>{{ msg }}</h1>
</template>

<style scoped>
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
```


- setupin.html

```html
<script src="https://unpkg.com/setupin/dist/main.umd.js"></script>

<script setup>
  const msg = ref('Hello World');
  const iptRef = ref(null);
  onMounted(() => {
    iptRef.value.focus();
  })
</script>

<template>
  <input ref="iptRef" v-model="msg">
  <h1>{{ msg }}</h1>
</template>

<style>
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
```