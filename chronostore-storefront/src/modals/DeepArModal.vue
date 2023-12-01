<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {SfButton, SfLoaderCircular} from '@storefront-ui/vue'
import * as DeepAr from 'deepar';
import { usePermission } from '@vueuse/core'

const camPerm = usePermission('camera');

interface Events {
    (event: "CloseModal"): void,
    (event: "test", id: number) : void,
}

const emit = defineEmits<Events>();

let deepAR = ref<DeepAr.DeepAR | undefined>(undefined);
const previewElement = ref(null);

if(previewElement.value === null)
{
    console.log("Close model");
    // emit("CloseModal");
}
else {
    
}

onMounted(() => {
    if(previewElement.value === null)
    {
        console.log("Close model");
        emit("CloseModal");
        return;
    }
    DeepAr.initialize({
        licenseKey: 'c4b5a6a452925253cb8b00f95f851bb88de194ee4dcdadba4028e1874d6875701faa41749503f0b3',
        previewElement: previewElement.value,
        effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators'
    }).then(value => {
        deepAR.value = value;
    }).catch((e)=>{
        window.alert(e.toString());
    });
  
});


</script>
<template>
    <div id="deeparModal" class="flex justify-center items-center">
        <SfButton @click="_ => emit('CloseModal')" class="absolute top-6 right-6">Close</SfButton>
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