<script lang="ts" setup>
import { useRoute, RouterLink } from 'vue-router';
import { inject, onMounted, reactive, ref } from 'vue';
import { ServiceKeys } from '../Constants';
import { Product } from '../types';
import { MedusaService } from '../services/MedusaStoreService';
import { store } from '../store';
import { HomeRouteRecord, ProductDetailRouteRecord, ShopRouteRecord, router } from '../Router';
import { Cart } from '@medusajs/medusa';
import Medusa from '@medusajs/medusa-js';
const medusa = inject<MedusaService>(ServiceKeys.MedusaJs);
const medusas = reactive<Medusa>(new Medusa({
  baseUrl: import.meta.env.VITE_MEDUSA_BACKEND_URL,
  maxRetries: 10,
}));

interface Pagination {
  limit:number,
  offset:number,
  count:number,
}
const route = useRoute();

const pagination = reactive<Pagination>({
  limit: 0,
  offset: 0,
  count: 0,
});

const products = ref<Product[]>([]);

const page = ref<number>(!Number.isNaN(parseInt(route.query.page as string))?parseInt(route.query.page as string):1);
const search = ref<string>(route.query.s as string ?? '');

onMounted(()=>{
  medusa?.products.ListAll(4, (page.value-1)*(pagination.limit===0?4:pagination.limit),search.value).then(e => {
  pagination.count = e.count;
  pagination.limit = e.limit;
  pagination.offset = e.offset;
  products.value = e.products;
})
})

function PageCount(){
  const a = []
  for (let index = 1; index <=  pagination.count/pagination.limit + 1; index++) {
    a.push(index);
    
  }
  return a;
}

function pageChange(index: number)
{
  router.push({
                      ...ShopRouteRecord,
                      query: {
                        page: index,
                        s:search.value,
                      }
    });
  page.value = index;
  store.commit('open-loading');
  medusa?.products.ListAll(4, (index-1)*pagination.limit,search.value)
  .then(e => {
    pagination.count = e.count;
    pagination.limit = e.limit;
    pagination.offset = e.offset;
    products.value = e.products;
  }).finally(()=>store.commit('close-loading'));
}
</script>

<template>
<section class="hero-section position-relative bg-light-blue padding-medium">
      <div class="hero-content">
        <div class="container">
          <div class="row">
            <div class="text-center padding-large no-padding-bottom">
              <h1 class="display-2 text-uppercase text-dark">Shop</h1>
              <div class="breadcrumbs">
                <span class="item">
                  <router-link :to="HomeRouteRecord">
                    Home > 
                  </router-link>
                </span>
                <span class="item">Shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
</section>
<div class="shopify-grid padding-large">
      <div class="container">
        <div class="row">
          <main class="col-md-9">
            <div class="filter-shop d-flex justify-content-between">
              <div class="showing-product">
                <p>Showing {{ pagination.limit < pagination.count?pagination.limit:pagination.count }} of {{pagination.count}} results</p>
              </div>
            </div>
            <div class="product-content product-store d-flex justify-content-between flex-wrap">
              <div v-for="product in products" :key="product.id"  class="col-lg-4 col-md-6">
                <div class="product-card position-relative pe-3 pb-3">
                  <div class="image-holder">
                    <router-link :to="{
                      ...ProductDetailRouteRecord,
                      params: {
                        id: product.id
                      }
                    }" >
                      <img :src="product.thumbnail" alt="product-item" class="img-fluid">
                    </router-link>
                  </div>
                  <div class="card-detail d-flex justify-content-between pt-3 pb-3">
                    <h3 class="card-title text-uppercase">
                      <router-link :to="{
                      ...ProductDetailRouteRecord,
                      params: {
                        id: product.id
                      }
                    }" >
                      {{ product.title }}
                    </router-link>
                    </h3>
                  </div>
                </div>                  
              </div>
            </div>
            <nav class="navigation paging-navigation text-center padding-medium" role="navigation">
              <div class="pagination loop-pagination d-flex justify-content-center align-items-center">
                <a href="#">
                  <svg class="chevron-left pe-3">
                    <use xlink:href="#chevron-left"></use>
                  </svg>
                </a>
                <template v-for="index in PageCount()" :key="index">

                  <span role="button" 
                    @click="()=>pageChange(index)" 
                    :class="{
                      'current':page === index
                    }"
                    class="page-numbers  pe-3">
                      {{ index }}
                  </span>
                </template>
                <a href="#">
                  <svg class="chevron-right ps-3">
                    <use xlink:href="#chevron-right"></use>
                  </svg>
                </a>
              </div>
            </nav>
          </main>
          <aside class="col-md-3">
            <div class="sidebar">
              <div class="widget-menu">
                <div class="widget-search-bar">
                  <form role="search" method="get" class="d-flex">
                    <input v-on:keydown.enter.prevent='() => pageChange(1)' v-model="search" class="search-field" placeholder="Search" type="text">
                    <div class="search-icon bg-dark">
                      <a @click.prevent="() => pageChange(1)" href="#">
                        <svg class="search text-light">
                          <use xlink:href="#search"></use>
                        </svg>
                      </a>
                    </div>
                  </form>
                </div> 
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
</template>