<script lang="ts" setup>
import { SfButton } from '@storefront-ui/vue';
import face from '../components/FaceDescriptorExtractor.vue';
import { ref } from 'vue';


const isOpenFaceLoginModal = ref(false);

function FaceDescriptorHandler(descriptor: Float32Array) {
    console.log(descriptor);
}
</script>
<template>
    <SfButton @click="() => {isOpenFaceLoginModal = true}">
        Login With Face
    </SfButton>
    <face v-if="isOpenFaceLoginModal" @CloseModal="() => isOpenFaceLoginModal = false" @ExtractDescriptor="FaceDescriptorHandler" ></face>
</template>

<style>
</style>
