# setupin

## 🤔 what is setupin

> setupin lets you write vue's \<script **setup**>**in** html.

## 😝 playground

[stackblitz](https://stackblitz.com/edit/stackblitz-starters-u6wftp?file=index.html)

## 🤯 setupin.html vs setup.vue

- setup.vue

```vue
<script setup>
  import { ref } from 'vue'
  const msg = ref('Hello Setupin!')
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style>
  h1 {
    color: pink;
  }
</style>
```

- setupin.html

```html
<script src="https://unpkg.com/setupin/dist/main.umd.js"></script>

<script setup>
  const msg = ref('Hello Setupin!')
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style>
  h1 {
    color: pink;
  }
</style>
```
