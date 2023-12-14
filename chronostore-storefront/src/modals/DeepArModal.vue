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
        licenseKey: import.meta.env.VITE_DEEPAR_SECRET,
        previewElement: previewElement.value,
        effect: 'https://chronostore.io.vn//deepar/wrist.deepar',
        additionalOptions:{
            cameraConfig:{
                disableDefaultCamera: false,
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
    <div id="deeparContainer" class="vh-100 vw-100 position-fixed top-0 left-0  spinner-container">
        <div id="previewElement" ref="previewElement">
            
        </div>
    </div>       
</template>

<style scoped>
#previewElement {
    width: 90%;
    height: 90%;
}

#deeparContainer
{
    background-color: rgba(82, 82, 82, 0.704);
    z-index: 99999999;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>