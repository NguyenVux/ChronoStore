<script lang="ts" setup>
import { inject, ref } from 'vue';
import { ServiceKeys } from '../../Constants';
import { MedusaService } from '../../services/MedusaStoreService';
import { store } from '../../store';
import { ProductVariant } from '../../types';

const medusa = inject<MedusaService>(ServiceKeys.MedusaJs);

interface Props {
    variantId:ProductVariant,
    quantity:number,
    [key:string]:unknown
}
const props = defineProps<Props>();




async function OnAddToCart() {
    let cartId = localStorage.getItem('cart-id');
    store.commit('open-loading');
    if(cartId === null)
    {
        try {
            const value = await medusa?.cart.Create();
            localStorage.setItem('cart-id',value.id);
            cartId = value.id;
        } catch (error) {
            console.error(error);
            return;
        }
    }
    await medusa?.cart.AddLineItem(cartId as string,props.variantId.id,props.quantity);
    store.commit('close-loading');

}
</script>



<template>
<button type="button" @click="OnAddToCart" v-bind="props">Add to cart</button>
</template>