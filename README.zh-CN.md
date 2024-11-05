<p align="right">
  <a href="./README.md">English</a> | <b>简体中文</b>
</p>

<p align="center"><img src="./doc/logo.svg"></p>

<p align="center">
  <a href="https://npmjs.com/package/setupin"><img src="https://img.shields.io/npm/v/setupin?color=orange"></a>
  <a href="https://stackblitz.com/edit/setupin"><img src="https://img.shields.io/badge/Open%20in%20StackBlitz-blue"></a>
</p>

## 😏 为什么选择 setupin

**setupin** 允许你在 HTML 中编写 Vue 的 [\<script setup\>](https://vuejs.org/api/sfc-script-setup.html)。

1. **便于学习**
   > 为初学者提供一个友好的环境，帮助他们轻松上手 Vue 的核心用法。
2. **简易开发**
   > 提供便捷的方式，助力快速开发小网页，无需繁琐的配置。
3. **快速体验**
   > 让用户可以快速在 HTML 中尝试 Vue 的新特性，感受其魅力。

## 🤯 setupin.html _vs_ setup.vue

<p align="center">
  <img src="./doc/setup.vue.svg" width="49%">
  <img src="./doc/setupin.html.svg" width="49%">
</p>

怎么样, 它们很像吧。

## 🤓 特性

- [x] 自动按需导入
- [x] 支持 esm 语法
- [x] [顶层 await](https://cn.vuejs.org/api/sfc-script-setup.html#top-level-await)
- [ ] [CSS 功能](https://cn.vuejs.org/api/sfc-css-features)
- [ ] vue3 宏函数

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
