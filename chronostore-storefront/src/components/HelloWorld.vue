<script setup lang="ts">
import {  onMounted, ref } from 'vue';
import * as DeepAr from 'deepar';

defineProps<{ msg: string }>()

const deeparContainer = ref<HTMLDivElement>();

let deepAr : DeepAr.DeepAR;

onMounted(async ()=>{
  deepAr = await DeepAr.initialize({
    licenseKey:import.meta.env.VITE_DEEPAR_KEY,
    effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators',
    previewElement: deeparContainer.value,
  });
});

function StopCam(){
  deepAr.stopCamera();
  console.log("FUCK");
}

</script>

<template>

<!-- <div ref="deeparContainer" class="deeparContainer"> -->
<button @click="StopCam">

</button>
<!-- </div> -->

 
</template>

<style scoped>
.deeparContainer {
  position:fixed;

  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  width: 80vw;
  height: 80vh;
}
</style>
