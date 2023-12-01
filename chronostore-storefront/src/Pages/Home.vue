<script setup lang="ts">
import Medusa from '@medusajs/medusa-js';
import { inject, ref } from 'vue';
import { ServiceKeys } from '../Constants';
import ProductContainer from '../components/ProductContainer.vue';
const medusa = inject<Medusa>(ServiceKeys.MedusaJs);
let products = ref<Array<any>>([]);
let error = ref<object | undefined>(undefined);
medusa?.products.list({}).then(p => products.value = p.products).catch(e => error.value = e);
</script>

<template>
  <ProductContainer v-if="products?.length != 0" :products="products"/>
  <div v-if="products?.length != 0">{{ products.toString() }}</div>
  <div v-if="error != undefined">
    {{error.toString()}}
  </div>
</template>