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

**setupin** 允许你在 HTML 中编写 Vue 的 [\<script setup\>](https://vuejs.org/api/sfc-script-setup.html)语法。

利用[vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc#readme)，运行时编译为esm格式的vue代码动态执行。

## 🤯 代码对比

<h3 align=center>esm</h3>
<h3 align=center>sfc</h3>
<h3 align=center>setupin</h3>

## 🤓 特性

[x] 支持 esm import 语法
[x] [顶层 await](https://cn.vuejs.org/api/sfc-script-setup.html#top-level-await)
[x] [CSS 功能](https://cn.vuejs.org/api/sfc-css-features)
[x] vue3 宏函数

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
