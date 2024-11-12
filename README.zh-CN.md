<p align="right">
  <a href="./README.md">English</a> | <b>简体中文</b>
</p>

<p align="center"><img src="./public/logo.svg"></p>

<p align="center">
  <a href="https://stackblitz.com/edit/setupin"><img src="https://img.shields.io/badge/stackBlitz-blue"></a>
  <a href="https://npmjs.com/package/setupin"><img src="https://img.shields.io/npm/v/setupin?color=orange"></a>
  <a href="https://bundlephobia.com/package/setupin"><img src="https://img.shields.io/bundlephobia/minzip/setupin"></a>
</p>

## 😏 setupin 是什么？

**setupin** 允许你在 HTML 中编写 Vue 的 [\<script setup>](https://cn.vuejs.org/api/sfc-script-setup.html)语法。

利用[vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc#readme)，在运行时编译为esm格式的vue代码，并动态执行。

## 🤯 代码对比

<h4 align=center>esm.html</h4>
写法略微复杂

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
无法直接在浏览器运行

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
合二为一

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

除了\<head>之外和[\<script setup>](https://cn.vuejs.org/api/sfc-script-setup.html)写法完全一致

## 🤓 特性

- [x] [顶层 await](https://cn.vuejs.org/api/sfc-script-setup.html#top-level-await)
- [x] [CSS 功能](https://cn.vuejs.org/api/sfc-css-features)
- [ ] 拆分 [组件](https://cn.vuejs.org/guide/essentials/component-basics.html)

## 🤔 为什么选择 setupin

1. **便于学习**
  为初学者提供一个友好的环境，帮助他们轻松上手 Vue 的核心用法。

2. **简易开发**
  提供便捷的方式，助力快速开发小网页，无需繁琐的配置。

3. **快速体验**
  让用户可以快速在 HTML 中尝试 Vue 的新特性，感受其魅力。

## 😝 演练场

在 [stackblitz](https://stackblitz.com/edit/setupin?file=index.html)
上尝试一下吧！

## 🥰 CDN

```html
<!-- 默认是dev版本 -->
<script src="https://unpkg.com/setupin"></script>

<!-- dev -->
<script src="https://unpkg.com/setupin/dist/main.js"></script>

<!-- prod -->
<script src="https://unpkg.com/setupin/dist/main.prod.js"></script>
```
