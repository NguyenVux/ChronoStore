<script lang="ts" setup>
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData, loadScript } from '@paypal/paypal-js'
import { PropType, onBeforeMount, reactive, ref } from 'vue'
import { store } from '../store';
import { Cart } from '@medusajs/medusa';
import Medusa from '@medusajs/medusa-js';

const client = new Medusa({
  baseUrl: import.meta.env.VITE_MEDUSA_BACKEND_URL,
  maxRetries: 10,
});
const emits = defineEmits<{
    (event:'done'):void;
    (event:'error'):void;
}>();
const { cart: pcart } = defineProps({
  cart: {
    type: Object as PropType<Omit<Cart, "refundable_amount" | "refunded_total">>,
    required: true,
  }
})
const cart = ref(pcart);
const paid  = ref(false);

onBeforeMount(function() {
    loadScript({
        clientId:import.meta.env.VITE_PAYPAL_APPID,
        currency: cart.value.region.currency_code.toUpperCase(),
        intent: "authorize"
     }).then((paypal) => {
        paypal?.Buttons?.({
            createOrder: async () => {
              if (cart.value.id && !cart.value.payment_sessions?.length && cart.value.items.length) {
                const ncart = await client.carts
                  .createPaymentSessions(cart.value?.id);
                cart.value = ncart.cart;
              }
              return cart.value.payment_session?.data.id as string;
            },
            onApprove: onApprove,
            })
            .render('#paypal-button-container');
    })
  })
async function onApprove(
        data: OnApproveData,
        actions: OnApproveActions)
{
  const authorization = await actions.order?.authorize();
  if(authorization === undefined) 
  {
    console.error('error');
    emits('error');
    return;
  }
  if (authorization.status !== "COMPLETED") {
    console.error(`An error occurred, status: ${authorization.status}`);
    emits('error');
    return
  }

  const result = await client
  .carts
  .complete(cart.value.id);
  store.commit('close-loading');
  emits('done');
}
</script>

<template>
    <div v-if="!paid" id="paypal-button-container"></div>
    <div v-else id="confirmation">Order complete!</div>
</template>


<style>
#paypal-button-container {
  width: 100%;
  margin: 30px 0;
}

#confirmation {
  color: green;
  margin-top: 1em;
  font-size: 2em;
}
</style>