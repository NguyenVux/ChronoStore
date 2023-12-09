<script lang="ts" setup>
import { PropType } from 'vue';
import { Product } from '../types';
import { RouteLocationRaw, RouterLink } from 'vue-router';
import {ProductDetailRouteRecord} from '../Router';

const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        require: false
    }
});

const productPageRoute : RouteLocationRaw = {
    name:ProductDetailRouteRecord.name,
    params:{
        id:props.product?.id
    }
};
</script>

<template>

<div class="product-card position-relative d-flex flex-column justify-content-between align-items-stretch" >
    <div class="image-holder">
        <router-link :to="productPageRoute" >
            <img  :src="product?.thumbnail" alt="product-item" class="img-fluid product-thumbnail">
        </router-link>
    </div>
    <div class="cart-concern position-absolute">
        <div class="cart-button d-flex">
            <a href="#" class="btn btn-medium btn-black">Add to Cart<svg class="cart-outline"><use xlink:href="#cart-outline"></use></svg></a>
        </div>
    </div>
    <h3 class="card-title d-inline-block text-uppercase text-truncate">
        {{ product?.title }}
    </h3>
</div>
</template>

<style scoped>
</style>
