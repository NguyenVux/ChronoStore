<script setup lang="ts">
import Medusa from '@medusajs/medusa-js';
import { inject, ref } from 'vue';
import { ServiceKeys } from '../Constants';
import ProductContainer from '../components/ProductContainer.vue';
const medusa = inject<Medusa>(ServiceKeys.MedusaJs);
let products = ref([] as Array<any>);
medusa?.products.list({limit:4}).then(p => products.value = p.products);
console.log(products.value?.length != 0);
</script>

<template>
  <ProductContainer v-if="products?.length != 0" :products="products"/>
</template>