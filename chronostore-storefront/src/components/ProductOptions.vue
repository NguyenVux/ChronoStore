<script lang="ts" setup>
import { PropType } from 'vue';
import { ProductVariant } from '../types';

const props = defineProps({
    variants:{
        type: Array<ProductVariant>,
        required:true,
    },
    selectedVariant:{
        type: Object as PropType<ProductVariant>,
        required:true,
    }
});

interface Events {
    (event: 'VariantChange',variant: ProductVariant): void,
}

const emit = defineEmits<Events>();

function variantChange(variant: ProductVariant)
{
    emit("VariantChange",variant);
}

const buttonClass = (variant: ProductVariant) => {
    return  {
        'btn': true,
        'btn-outline-secondary': variant.id !== props.selectedVariant.id,
        'btn-primary': variant.id === props.selectedVariant.id,
    };

}

</script>

<template>
    <div class="color-options product-select">
        <div class="color-toggle" data-option-index="0">
            <h4 class="item-title text-uppercase text-dark text-decoration-underline">Variant:</h4>
            <ul class="select-list list-unstyled d-flex">
                <li class="select-item pe-3" v-for="value in props.variants" :key="value.id">
                    <button @click="() => variantChange(value)" v-bind:class="buttonClass(value)">{{ value.title }}</button>
                </li>
            </ul>
        </div>
    </div>
</template>