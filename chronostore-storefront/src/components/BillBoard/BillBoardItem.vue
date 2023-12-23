<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ShopRouteRecord } from '../../Router';

</script>

<template>
<div class="container">
    <div class="row d-flex flex-wrap align-items-center">
    <div class="col-md-6">
        <div class="banner-content">
        <h1 class="display-2 text-uppercase text-dark pb-5">Technology Hack You Won't Get</h1>
        <router-link class="btn btn-medium btn-dark text-uppercase btn-rounded-none" :to="ShopRouteRecord">
            Shop Product
        </router-link>
        </div>
    </div>
    <div class="col-md-5">
        <div class="image-holder">
        <img src="images/banner-image.png" alt="banner">
        </div>
    </div>
    </div>
</div>
</template>