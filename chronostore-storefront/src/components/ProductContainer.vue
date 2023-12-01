<script lang="ts" setup>
import { SfIconChevronLeft, SfIconChevronRight } from '@storefront-ui/vue';
import { Product } from '../types';
import ProductCard from './ProductCard.vue';

const props = defineProps({
    products: Array<Product>
});

const chevronSize = '2xl';
</script>

<template>
<div class="relative">
    <div class="w-full overflow-scroll">
        <div class="grid grid-rows-2 grid-flow-col gap-4 justify-between w-full">
            <ProductCard v-for="item in props.products" :key="item.id" :product="item" />
        </div>
    </div>
    <SfIconChevronLeft :size="chevronSize" class="absolute top-1/2 left-0 transform -translate-y-1/2"/>
    <SfIconChevronRight :size="chevronSize" class="absolute top-1/2 right-0 transform -translate-y-1/2"/>
</div>
</template>