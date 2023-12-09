<script lang="ts" setup>
import { Product } from '../types';
import ProductCard from './ProductCard.vue';

const props = defineProps({
    products:{
        type:  Array<Product>,
        value: []
    }
});


const swiperBreakPoints = {
    0: {
    slidesPerView: 2,
    spaceBetween: 20,
    },
    980: {
    slidesPerView: 4,
    spaceBetween: 20,
    }
};
</script>

<template>
<section id="mobile-products" class="product-store position-relative padding-large no-padding-top">
    <div class="container">
        <swiper-container 
            slides-per-view="4" 
            space-between="10" 
            navigation="true"
            auto-height="false"
            :pagination="{
                clickable: true
            }"
            :break-points="swiperBreakPoints"
        >
                <swiper-slide v-for="item in props.products" :key="item.id" >
                    <ProductCard :product="item" />
                </swiper-slide>
        </swiper-container>
    </div>
</section>
</template>