<script setup lang="ts">
import Medusa from '@medusajs/medusa-js';
import { inject, ref } from 'vue';
import { ServiceKeys } from '../Constants';
import ProductContainer from '../components/ProductContainer.vue';
import BillBoard from '../components/BillBoard/BillBoard.vue';
const medusa = inject<Medusa>(ServiceKeys.MedusaJs);
let products = ref<Array<any>>([]);
let error = ref<object | undefined>(undefined);
medusa?.products.list({}).then(p => {products.value = p.products; console.log(products.value)}).catch(e => error.value = e);
</script>

<template>
  <BillBoard/>
  <ProductContainer v-if="products?.length != 0" :products="products"/>
</template>