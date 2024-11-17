<p align="right">
  <b>English</b> | <a href="./README.zh-CN.md">简体中文</a>
</p>

<p align="center"><img src="./public/logo.svg"></p>

<p align="center">
  <a href="https://stackblitz.com/edit/setupin"><img src="https://img.shields.io/badge/stackBlitz-blue"></a>
  <a href="https://npmjs.com/package/setupin"><img src="https://img.shields.io/npm/v/setupin?color=orange"></a>
  <a href="https://bundlephobia.com/package/setupin"><img src="https://img.shields.io/bundlephobia/minzip/setupin"></a>
</p>

## 😏 What is a setupin?

**setupin** allows you to write Vue's [\<script **setup**>](https://vuejs.org/api/sfc-script-setup.html)**in** HTML.

Using the [sfc2esm](../../../sfc2esm), which compiled at runtime for esm vue code format, and dynamic execution.

## 🤯 Code comparison

<h4 align=center>esm.html</h4>
It's a little more complicated

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>esm</title>
  <style>
    button {
      font-size: larger;
    }
  </style>
</head>
<body>
  <div id="app">
    <button @click="count++">{{ count }}</button>
  </div>

  <script type="module">
    import { createApp, defineComponent, ref } from 'https://unpkg.com/vue/dist/vue.esm-browser.js';
    const App = defineComponent(() => {
      const count = ref(0);
      return {
        count
      };
    });
    createApp(App).mount('#app')
  </script>
</body>
</html>
```

<h4 align=center>setup.vue</h4>
Cannot run directly in the browser

```html
<script setup>
  import { ref } from 'vue'
  const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>

<style>
  button {
    font-size: larger;
  }
</style>
```

<h4 align=center>setupin.html</h4>
unit as one

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>setupin</title>
  <script src="https://unpkg.com/setupin"></script>
</head>

<script setup>
  import { ref } from 'vue'
  const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>

<style>
  button {
    font-size: larger;
  }
</style>
```

It's exactly the same as [\<script setup>](https://vuejs.org/api/sfc-script-setup.html) except for the \<head>

## 🤓 Characteristics

- [x] [top-level await](https://vuejs.org/api/sfc-script-setup.html#top-level-await)
- [x] [sfc css features](https://vuejs.org/api/sfc-css-features.html)
- [x] [Options API](https://vuejs.org/guide/introduction.html#options-api)
- [ ] Split [component](https://vuejs.org/guide/essentials/component-basics.html)

## 🤔 Why setupin

1. **Easy to learn**
  Offer a friendly environment for beginners to easily grasp the core usage of Vue.
2. **Simple development**
  Provide a convenient way to rapidly develop small webpage without complex configurations.
3. **Quick experience**
  Allow users to quickly experiment with Vue's new features in HTML and feel its charm.

## 😝 Playground

try it on
[stackblitz](https://stackblitz.com/edit/setupin?file=index.html)
!

## 🥰 Usage

```html
<!-- The default is the dev version -->
<script src="https://unpkg.com/setupin"></script>

<!-- dev -->
<script src="https://unpkg.com/setupin/dist/main.js"></script>

<!-- prod -->
<script src="https://unpkg.com/setupin/dist/main.prod.js"></script>
```
