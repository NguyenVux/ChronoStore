<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import {SfButton, SfLoaderCircular} from '@storefront-ui/vue'
import * as DeepAr from 'deepar';
import Camera from "simple-vue-camera";


interface Events {
    (event: "CloseModal"): void,
    (event: "test", id: number) : void,
}

const emit = defineEmits<Events>();

let deepAR = ref<DeepAr.DeepAR | undefined>(undefined);
const previewElement = ref(null);


onMounted(() => {
    if(previewElement.value === null)
    {
        console.log("Close model");
        emit("CloseModal");
        return;
    }
    DeepAr.initialize({
        licenseKey: import.meta.env.DEEPAR_SECRET,
        previewElement: previewElement.value,
        effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators',
        additionalOptions:{
            cameraConfig:{
                disableDefaultCamera: true,
            }
        }
    }).then(value => {
        deepAR.value = value;
    }).catch((e)=>{
        window.alert(e.toString());
    });
  
});

onBeforeUnmount(() => {
    if(deepAR.value !== undefined)
    {
        console.log("Shutting down");
        deepAR.value.shutdown();
    }
});


</script>
<template>
    <div id="deeparModal" class="flex justify-center items-center">
        <SfButton @click="_ => emit('CloseModal')" class="absolute top-6 right-6">Close</SfButton>
        <Camera :resolution="{ width: 720, height: 1280 }" autoplay></Camera>
        <div v-if="deepAR === undefined" >
            <SfLoaderCircular size="4xl" />    
        </div>
        <div v-show="deepAR !== undefined"  id="previewElement" ref="previewElement"></div>
    </div>
</template>

<style scoped>

#previewElement {
    width: 80%;
    height: 80%;
}

#deeparModal {
    z-index: 999;
    position:fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #5252526e;
}
</style>