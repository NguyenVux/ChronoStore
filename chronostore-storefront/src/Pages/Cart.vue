<script lang="ts" setup>

import Medusa from "@medusajs/medusa-js"


import { onMounted, ref } from 'vue';
import { store } from '../store';
import { ShopRouteRecord } from '../Router';
import { Cart, PaymentSession } from "@medusajs/medusa";
import PaypalButton from "../components/paypalButton.vue";

const medusas = new Medusa({
  baseUrl: import.meta.env.VITE_MEDUSA_BACKEND_URL,
  maxRetries: 10,
});
const cart = ref<Omit<Cart, "refundable_amount" | "refunded_total">| null>();

onMounted(async ()=>{
  let cartId = localStorage.getItem('cart-id');
  store.commit('open-loading');
  if(cartId === null)
  {
      try {
          const value = await medusas?.carts.create();
          localStorage.setItem('cart-id',value.cart.id);
          cartId = value.cart.id;
          cart.value = value.cart;
        } catch (error) {
          console.error(error);
          return;
        }
        store.commit('close-loading');
  }
  else {
    try {
      const value = await medusas?.carts.retrieve(cartId);
      localStorage.setItem('cart-id',value.cart.id);
      cart.value = value.cart;
    } catch (error) {
      console.error(error);
      return;
    }
    store.commit('close-loading');
  }
  

  
});


async function newQuantity(lineId:string,quantity:number){
  try {
      const value = await medusas.carts.lineItems.update(cart.value?.id as string,lineId,{
        quantity:quantity
      });
      cart.value = value.cart;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function removeLine(lineId:string){
  try {
      const value = await medusas.carts.lineItems.delete(cart.value?.id as string,lineId);
      cart.value = value.cart;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function done() {
  try {
          const value = await medusas?.carts.create();
          localStorage.setItem('cart-id',value.cart.id);
          cart.value = value.cart;
  } catch (error) {
    console.error(error);
    return;
  }
}



</script>

<template>
 <section class="shopify-cart padding-large">
      <div class="container">
        <div class="row">
          <div class="cart-table">
            <div class="cart-header">
              <div class="row d-flex text-uppercase">
                <h3 class="cart-title col-lg-4 pb-3">Product</h3>
                <h3 class="cart-title col-lg-3 pb-3">Quantity</h3>
                <h3 class="cart-title col-lg-4 pb-3">Subtotal</h3>
              </div>
            </div>
            <div v-for="item in cart?.items" :key="item.id" class="cart-item border-top border-bottom padding-small">
              <div class="row align-items-center"> 
                <div class="col-lg-4 col-md-3">
                  <div class="cart-info d-flex flex-wrap align-items-center mb-4">
                    <div class="col-lg-5">
                      <div class="card-image">
                        <img v-if="item.thumbnail !== null" :src="item.thumbnail" alt="cloth" class="img-fluid">
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="card-detail ps-3">
                        <h5 class="card-title text-uppercase">
                          {{item.title}}
                        </h5>
                        <h6 class="card-title text-uppercase">
                          {{item.description}}
                        </h6>
                        <div class="card-price">
                          <span class="money text-primary">$ {{ item.unit_price }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-7">
                  <div class="row d-flex">
                    <div class="col-md-6">
                      <div class="qty-field">
                        <div class="qty-number d-flex">
                          <button @click="()=>{newQuantity(item.id,item.quantity+1)}" class="quantity-right-plus btn btn-number">+</button>
                          <input :value="item.quantity"  class="spin-number-output bg-light no-margin" type="text" readonly="true">
                          <button :disabled="item.quantity<2"  @click="()=>{newQuantity(item.id,Math.max(item.quantity-1,0))}" class="quantity-right-minus btn btn-number">-</button>
                        </div>
                        <div class="regular-price"></div>
                        <div class="quantity-output text-center bg-primary"></div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="total-price">
                        <span class="money text-primary">$ {{ (item.unit_price as number) * item.quantity}}</span>
                      </div>
                    </div>   
                  </div>             
                </div>
                <div class="col-lg-1 col-md-2">
                  <div @click="() => removeLine(item.id)" role="button"  class="cart-remove">
                    <div>
                      <svg class="close" width="38px">
                        <use xlink:href="#close"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-totals bg-grey padding-medium">
            <h2 class="display-7 text-uppercase text-dark pb-4">Cart Totals</h2>
            <div class="total-price pb-5">
              <table cellspacing="0" class="table text-uppercase">
                <tbody>
                  <tr class="order-total pt-2 pb-2 border-bottom">
                    <th>Sub total</th>
                    <td data-title="Total">
                      <span class="price-amount amount text-primary ps-5">
                        <bdi>
                          <span class="price-currency-symbol">$</span>{{cart?.subtotal }}</bdi>
                      </span>
                    </td>
                  </tr>
                  <tr class="order-total pt-2 pb-2 border-bottom">
                    <th>Total</th>
                    <td data-title="Total">
                      <span class="price-amount amount text-primary ps-5">
                        <bdi>
                          <span class="price-currency-symbol">$</span>{{cart?.total }}</bdi>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="button-wrap">
              <router-link :to="ShopRouteRecord" class="btn btn-black btn-medium text-uppercase me-2 mb-3 btn-rounded-none">Continue Shopping</router-link>
              <!-- <button class="btn btn-black btn-medium text-uppercase mb-3 btn-rounded-none">Proceed to checkout</button> -->
              <paypal-button @done="done" v-if="cart !== undefined" :cart="(cart as Omit<Cart, `refundable_amount` | `refunded_total`>)"></paypal-button>
            </div>
          </div>
        </div>
      </div>
    </section> 
</template>