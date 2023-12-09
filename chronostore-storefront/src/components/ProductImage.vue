<script lang="ts" setup>
import {  ProductImg } from '../types';

const props = defineProps({
    imgs:{
        type:  Array<ProductImg>,
        value: []
    }
});
</script>

<template>
<swiper-container
                  slides-per-view="1"
                  space-between="0"
                  navigation="true"
                  auto-height="false"
                  :pagination="{
                      clickable: true
                  }"
                  >
                  <swiper-slide v-for="img in props.imgs" :key="img.id" >
                      <div class="d-flex justify-content-center align-items-center">
                        <img :src="img.url" :alt="img.id" class="img-fluid">
                      </div>
                  </swiper-slide>
                </swiper-container>
</template>