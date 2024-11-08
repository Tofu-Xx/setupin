export const source = `
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
