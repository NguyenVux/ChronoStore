<script lang='ts' setup>
import * as FaceAPI from '@vladmandic/face-api';
import { computed, onMounted, onUnmounted, reactive, ref, toRaw } from 'vue';

interface Events {
    (event: 'close-modal'): void,
    (event: 'done-capture', files: Blob[]) : void,
}
const isFaceAPILoaded = ref(false);
const emit = defineEmits<Events>();

const detectorOpts = new FaceAPI
                            .TinyFaceDetectorOptions({
                                inputSize:736,
                                scoreThreshold:0.3
                            });

interface angle {
    yaw:number,
    pitch: number,
    roll: number,
}
interface FaceAngleSet {
    name:string,
    comparer: (value: angle) => boolean
}
const faceAngleSet : FaceAngleSet[] = [
    {
        name: 'front',
        comparer: (value) =>{

            return value.yaw > -50 && value.yaw < 50 
                && value.roll > -40 && value.roll < 40
                && value.pitch > -40 && value.pitch < 40;
        }
    },
    {
        name: 'up',
        comparer: (value) =>{
            return value.yaw > -50 && value.yaw < 50 
                && value.roll > -40 && value.roll < 40
                && value.pitch > 10;
        }
    },
    {
        name: 'down',
        comparer: (value) =>{
            return value.yaw > -50 && value.yaw < 50 
                && value.roll > -40 && value.roll < 40
                && value.pitch < -4;
        }
    },
    {
        name: 'left',
        comparer: (value) =>{
            return value.yaw < -70 
                && value.roll > -40 && value.roll < 40
                && value.pitch > -40 && value.pitch < 40;
        }
    },
    {
        name: 'right',
        comparer: (value) =>{
            return value.yaw > 80 
                && value.roll > -40 && value.roll < 40
                && value.pitch > -40 && value.pitch < 40;
        }
    },
];

const faceSetIndex = ref(0);
const beginCapture = ref(false);
const totalFiles = reactive<Blob[]>([]);


async function IsMatch(angleSet: FaceAngleSet) {
    console.log('before');
    console.log(FaceAPI.nets.tinyYolov2.isLoaded);
    const result = await FaceAPI.detectAllFaces(
        video.value as HTMLVideoElement, 
        detectorOpts
        ).withFaceLandmarks(true).withFaceDescriptors();
    if(result !== undefined && angleSet.comparer(result[0].angle as angle))
    {
        return result;
    }
}
    
    
const requestId = ref(0);
function takeASnap(data: FaceAPI.FaceDetection){
    const NullPromise = new Promise<Blob | null>((r)=>r(null));
    if(!video.value) return NullPromise;
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d'); // get its context
    if(!ctx) return NullPromise;
    canvas.width = video.value.videoWidth; // set its size to the one of the video
    canvas.height = video.value.videoHeight;
    ctx.drawImage(video.value, 
    data.box.topLeft.x,
    data.box.topLeft.y,
    data.box.width,
    data.box.height,
    0,0,
    canvas.width,
    canvas.height,
    ); // the video
    return new Promise<Blob | null>((res)=>{
        canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
    });
}

async function Detect() {
    if(faceSetIndex.value >= faceAngleSet.length) {
        emit('done-capture',toRaw(totalFiles));
        return;
    }
    if( video.value !== null && video.value !== undefined)
    {
        const result = await IsMatch(faceAngleSet[faceSetIndex.value]);
        if(result !== undefined)
        {
            let image = await takeASnap(result.detection);
            if(image != null)
            {
                totalFiles.push(image);
                faceSetIndex.value++;
            }
        }
    }
    requestId.value = requestAnimationFrame(Detect);
}

const video = ref<HTMLVideoElement>();
const stream = ref<MediaStream>();
const message = computed(()=> {
    if(faceSetIndex.value < faceAngleSet.length)
    {
        return faceAngleSet[faceSetIndex.value].name;
    }
    return 'done';
});

onMounted(async ()=>{
    await LoadRequireModel();
    stream.value = await navigator.mediaDevices.getUserMedia({
        video:{
            facingMode:'user',
            width: window.innerWidth,
            height: window.innerHeight
        },
        audio:false,
    })
    if( video.value !== null && video.value !== undefined)
    {
        video.value.srcObject = stream.value;
    }
    
});
function cancel(){
    emit('close-modal');
}

onUnmounted(()=>{
    stream.value?.getTracks().forEach(e => {
        if(e.readyState == 'live') e.stop();
    })
    window.cancelAnimationFrame(requestId.value);
});

async function LoadRequireModel() {
    await Promise.allSettled([
        FaceAPI.nets.tinyYolov2.load('face-api/weights'),
        FaceAPI.nets.tinyFaceDetector.load('face-api/weights'),
        FaceAPI.nets.faceLandmark68TinyNet.load('face-api/weights'),
        FaceAPI.nets.faceRecognitionNet.load('face-api/weights'),
    ]);
    console.log('done loading');
    isFaceAPILoaded.value = true;
}

</script>
<template>
    <div id="face-login-modal">
        <div v-if="isFaceAPILoaded" id="video-container">
            <video id="preview-video" autoplay playsinline ref="video" @loadedmetadata="()=>{
                Detect();
                beginCapture = true;
            }">
            </video>
            <div v-show="beginCapture" id="overlay">
                <button @click="()=>cancel()" class="btn btn btn-secondary btn-lg"> cancel</button>
                <div id="face-status"> Please facing {{message}}</div>
            </div>
        </div>
    </div>
</template>

<style>

#face-login-modal {
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(57, 57, 57, 0.643);
}
#face-status
{
    margin-top: 3em;
    background-color: rgba(0, 0, 0, 0.345);
    color: white;
    padding: 2em;
    text-align: center;
    border-radius: 0.5em;
    font-weight: bold;
    font-size: large;
    width:  60%;
}

#preview-video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
#video-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 80%;
    height: 80%;
}
#overlay
{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding: 3em;
}

#overlay > *
{
    z-index: 100000;
}
</style>
