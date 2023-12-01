<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Flicking  from '@egjs/vue3-flicking';
import Medusa from '@medusajs/medusa-js';
import { inject, ref } from 'vue';
import { ServiceKeys } from '../Constants';
import { Product } from '../types';
import { SfButton } from '@storefront-ui/vue'
import DeepArModel from '../modals/DeepArModal.vue';

const route = useRoute();
const medusa = inject<Medusa>(ServiceKeys.MedusaJs);

let product = ref<Product | undefined>(undefined);
medusa?.products.retrieve(route.params.id as string).then(p => product.value = p.product).catch(console.error);


const isShowdeepArModal = ref<Boolean>(false);

function CloseModal() {
  isShowdeepArModal.value = false;
}
</script>

<template>
  <!-- <Flicking :options="{ align: 'prev', circular: true }" >
    <div class="panel">1</div>
    <div class="panel">2</div>
    <div class="panel">3</div>
  </Flicking> -->
  <div v-if="product !== undefined">
    <Flicking :options="{ align: 'prev', circular: true }" >
      <img v-for="img in product.images" :key="img.id" :src="img.url" alt="product_image">
    </Flicking>
    <SfButton @click="_ => isShowdeepArModal = true">Try on</SfButton>
    <DeepArModel v-if="isShowdeepArModal" v-on:CloseModal="CloseModal"/>
  </div>
</template>