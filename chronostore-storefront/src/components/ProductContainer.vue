<script lang="ts" setup>
import { Product } from '../types';
import ProductCard from './ProductCard.vue';

const props = defineProps({
    products: Array<Product>
});
</script>

<template>
<div class="grid grid-cols-2 grid-flow-rows p-6 gap-4 ">
    <template v-for="item in props.products" :key="item.id">
        <ProductCard :product="item" />
    </template>      
</div>
</template>