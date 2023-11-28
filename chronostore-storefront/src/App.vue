<script setup lang="ts">
import Medusa from '@medusajs/medusa-js';
import { inject } from 'vue';
import { ServiceKeys } from './Constants';

const medusa = inject<Medusa>(ServiceKeys.MedusaJs);
medusa?.products.list().then(console.log);
</script>

<template>
  <div>
  </div>
  <!-- <HelloWorld/> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
