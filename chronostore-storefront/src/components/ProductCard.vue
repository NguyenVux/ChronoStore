<script lang="ts" setup>
import { PropType } from 'vue';
import { SfRating, SfCounter, SfLink, SfButton, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/vue';
import { Product } from '../types';
import { RouterLink } from 'vue-router';

const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        require: false
    }
});

const productRoute = `/product/${props.product?.id}`;
</script>

<template>
<div class="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
    <div class="relative">
    <router-link :to="productRoute" class="block">
        <img
        :src="product?.thumbnail"
        alt="Great product"
        class="block object-cover h-auto rounded-md aspect-square"
        width="300"
        height="300"
        />
    </router-link>
    </div>
    <div class="p-4 border-t border-neutral-200">
    <SfLink href="#" variant="secondary" class="no-underline"> {{ product?.title }}</SfLink>
    <div class="flex items-center pt-1">
        <SfRating size="xs" :value="5" :max="5" />

        <SfLink href="#" variant="secondary" class="pl-1 no-underline">
        <SfCounter size="xs">123</SfCounter>
        </SfLink>
    </div>
    <router-link :to="productRoute">
        <SfButton size="sm">
            <template #prefix>
            <SfIconShoppingCart size="sm" />
            </template>
        </SfButton>
    </router-link>
    
    </div>
</div>
</template>
