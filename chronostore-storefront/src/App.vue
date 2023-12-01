<script setup lang="ts">
import Medusa from '@medusajs/medusa-js';
import { inject, ref } from 'vue';
import { ServiceKeys } from './Constants';
import ProductContainer from './components/ProductContainer.vue';
const medusa = inject<Medusa>(ServiceKeys.MedusaJs);
let products = ref([] as Array<any>);
medusa?.products.list({limit:4}).then(p => products.value = p.products);
console.log(products.value?.length != 0);
</script>

<template>
  <ProductContainer v-if="products?.length != 0" :products="products"/>
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
