<p align="right">
  <b>English</b> | <a href="./README.zh-CN.md">简体中文</a>
</p>

<p align="center"><img src="./doc/logo.svg"></p>

<p align="center">
  <a href="https://npmjs.com/package/setupin"><img src="https://img.shields.io/npm/v/setupin?color=orange"></a>
  <a href="https://stackblitz.com/edit/setupin"><img src="https://img.shields.io/badge/Open%20in%20StackBlitz-blue"></a>
</p>

## 😏 Why setupin

**setupin** allows you to write Vue's [\<script **setup**\>](https://vuejs.org/api/sfc-script-setup.html)**in** HTML.

1. **Easy to learn**
   > Offer a friendly environment for beginners to easily grasp the core usage of Vue.
2. **Simple development**
   > Provide a convenient way to rapidly develop small webpage without complex configurations.
3. **Quick experience**
   > Allow users to quickly experiment with Vue's new features in HTML and feel its charm.

## 🤯 setupin.html _vs_ setup.vue

<p align="center">
  <img src="./doc/setup.vue.svg" width="49%">
  <img src="./doc/setupin.html.svg" width="49%">
</p>

How about that? Aren't they similar

## 🤓 Characteristics

- [x] auto on-demand import
- [x] supports esm syntax
- [x] [top-level await](https://vuejs.org/api/sfc-script-setup.html#top-level-await)
- [ ] [sfc css features](https://vuejs.org/api/sfc-css-features.html)
- [ ] vue3 macro functions

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
