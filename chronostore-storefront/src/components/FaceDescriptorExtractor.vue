<script lang='ts' setup>
// import {onBeforeUnmount, onMounted, ref} from 'vue';
// import {SfButton, SfLoaderCircular} from '@storefront-ui/vue'
import Camera from 'simple-vue-camera';
import * as FaceAPI from '@vladmandic/face-api';
import { SfButton } from '@storefront-ui/vue';
import { ref } from 'vue';

interface Events {
    (event: 'CloseModal'): void,
    (event: 'ExtractDescriptor', descriptor: Float32Array) : void,
}
const isFaceAPILoaded = ref(false);
const camera = ref<InstanceType<typeof Camera>>();
const emit = defineEmits<Events>();

const detectorOpts = new FaceAPI
                            .TinyFaceDetectorOptions({
                                inputSize:736,
                                scoreThreshold:0.3
                            });



async function Extract() {
    
    if(camera.value?.video?.onloadeddata !== undefined)
    {
        console.log(isFaceAPILoaded.value);
        const result = await FaceAPI.detectAllFaces(
            camera.value.video, 
            detectorOpts
            ).withFaceLandmarks(true).withFaceDescriptors();
        if(result.length !== 1)
        {
            window.alert('Face not found or more than one face');
        }
        else {
            const FRResult = result[0];
            console.log();
            emit('ExtractDescriptor',FRResult.descriptor);
            emit('CloseModal');
        }
    }
}
function CloseModal() {
    emit('CloseModal');
}
async function LoadRequireModel() {
    await Promise.allSettled([
        FaceAPI.nets.tinyFaceDetector.load('face-api/weights'),
        FaceAPI.nets.faceLandmark68TinyNet.load('face-api/weights'),
        FaceAPI.nets.faceRecognitionNet.load('face-api/weights'),
    ]);
    isFaceAPILoaded.value = true;
}
LoadRequireModel();
</script>
<template>
    <div id='face-login-modal' class='fixed top-0 left-0 flex justify-center items-center' style='width: 100vw; height: 100vh;'>
    <div class='absolute w-full h-full bg-black opacity-90 blur-0'></div>
    <Camera ref='camera' v-if='isFaceAPILoaded' :resolution='{ width: 720, height: 1280 }' autoplay>
        <SfButton class='m-3 w-36 h-24' @click='Extract'>
            Login
        </SfButton>
        <SfButton class='m-3 w-36 h-24' @click='CloseModal'>
            Close
        </SfButton>
    </Camera>
    </div>
</template>

<style>
#slot-container {
    @apply w-full;
    @apply flex;
    /* @apply flex-col-reverse; */
    @apply justify-center;
    @apply items-end;
}
</style>
