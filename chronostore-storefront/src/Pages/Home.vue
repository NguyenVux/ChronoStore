<script setup lang="ts">
import { inject, ref } from 'vue';
import { ServiceKeys } from '../Constants';
import ProductContainer from '../components/ProductContainer.vue';
import BillBoard from '../components/BillBoard/BillBoard.vue';
import { MedusaService } from '../services/MedusaStoreService';
const medusa = inject<MedusaService>(ServiceKeys.MedusaJs);
let products = ref<Array<any>>([]);
let error = ref<object | undefined>(undefined);

medusa?.products.ListAll().then(p => products.value = p.products).catch(e => error.value = e);
</script>

<template>
  <BillBoard/>
  <ProductContainer v-if="products?.length != 0" :products="products"/>
</template>