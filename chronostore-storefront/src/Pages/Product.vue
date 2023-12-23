<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { inject, onMounted, ref } from 'vue';
import { ServiceKeys } from '../Constants';
import { Product, ProductVariant } from '../types';
import DeepArModel from '../modals/DeepArModal.vue';
import ProductOption from '../components/ProductOptions.vue';
import ProductImage from '../components/ProductImage.vue';
import AddToCard from '../components/cart/AddToCard.vue';

import { MedusaService } from '../services/MedusaStoreService';
import { store } from '../store';
const medusa = inject<MedusaService>(ServiceKeys.MedusaJs);

const route = useRoute();

let product = ref<Product | undefined>(undefined);
const selectedVariant = ref<ProductVariant>();

const quantity = ref<number>(1);

medusa?.products.Get(route.params.id as string)
            .then(p => {
              product.value = p;
              selectedVariant.value = product.value?.variants[0] as ProductVariant;
              store.commit('close-loading');
            })
            .catch(console.error);

onMounted(()=>{
  store.commit('open-loading');
})


const isShowdeepArModal = ref<Boolean>(false);

function CloseModal() {
  isShowdeepArModal.value = false;
}
</script>

<template>
    <template  v-if="product !== undefined">
      <section id="selling-product" class="single-product">
        <div class="container">
          <div class="row mt-5">
            <div class="col-lg-6">
              <div class="product-preview mb-3">
                <product-image :key="selectedVariant?.id" :imgs="selectedVariant?.images"/>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="product-info">
                <div class="element-header">
                  <h3 itemprop="name" class="display-7 text-uppercase">{{ product.title }}</h3>
                  <h7 itemprop="name" class="display-7 text-uppercase">{{ product.subtitle }}</h7>
                </div>
                <div class="product-price pt-3 pb-3">
                  <strong class="text-primary display-6 fw-bold text-uppercase">{{selectedVariant?.prices[0].currency_code}} {{ selectedVariant?.prices[0].amount }}</strong>
                </div>
                <p>{{ product.description }}</p>
                <div class="cart-wrap padding-small">
                  <product-option v-if="selectedVariant !== undefined" :variants="product.variants" :selectedVariant="selectedVariant" @variantChange="(variant) => selectedVariant = variant"/>
                  <div class="product-quantity">
                    <div class="stock-number text-dark">2 in stock</div>
                    <div class="stock-button-wrap pt-3">
                      <div class="input-group product-qty">
                          <span class="input-group-btn">
                              <button @click="()=> quantity = Math.max(quantity-1,0)" type="button" class="quantity-left-minus btn btn-number"  data-type="minus" data-field="">
                                -
                              </button>
                          </span>
                          <input type="text" id="quantity" name="quantity" class="form-control input-number" v-model="quantity" min="1" max="100">
                          <span class="input-group-btn">
                              <button @click="()=> quantity++" type="button" class="quantity-right-plus btn btn-number" data-type="plus" data-field="">
                                  +
                              </button>
                          </span>
                      </div>
                      <div class="qty-button d-flex flex-wrap pt-3">
                        <button @click="_ => isShowdeepArModal=true" class="btn btn-light btn-medium text-uppercase me-3 mt-3">Try On</button>
                        <button type="submit" class="btn btn-primary btn-medium text-uppercase me-3 mt-3">Buy now</button>
                        <!-- <button type="submit" name="add-to-cart" value="1269" class="btn btn-black btn-medium text-uppercase mt-3">Add to cart</button> -->
                        <AddToCard :quantity="quantity" :variantId="selectedVariant" class="btn btn-black btn-medium text-uppercase mt-3"></AddToCard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeepArModel v-if="isShowdeepArModal" @CloseModal="CloseModal"/>
    </template>
</template>