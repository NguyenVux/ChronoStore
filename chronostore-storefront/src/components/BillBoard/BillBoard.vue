<script lang='ts' setup>
// import 'swiper/css';
import BillBoardItem from './BillBoardItem.vue';
import BillBoardNavigator from './BillBoardNavigator.vue';



</script>

<template>
    <section id="billboard" class="position-relative overflow-hidden bg-light-blue">
      <swiper-container navigation="true">
        <swiper-slide>
          <BillBoardItem/>
        </swiper-slide>
        <swiper-slide>
          <BillBoardItem/>
        </swiper-slide>
      </swiper-container>
        
    </section>
</template>