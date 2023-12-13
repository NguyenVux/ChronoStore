<script lang="ts" setup>
import face from '../components/fiveFaceImage.vue';
import { ref } from 'vue';


const isOpenFaceLoginModal = ref(false);

function doneCapture(files: Blob[]) {
    isOpenFaceLoginModal.value = false;
    console.log(files);
}
</script>

<template>
    <button @click="() => {isOpenFaceLoginModal = true}">
        Login With Face
    </button>
    <face v-if="isOpenFaceLoginModal" @close-modal="() => isOpenFaceLoginModal = false" @done-capture="doneCapture" ></face>
</template>

<style>
</style>
