<script lang="ts" setup>
import { ServiceKeys } from '../Constants';
import { inject, reactive, ref } from 'vue';
import { Customer, MedusaService } from '../services/MedusaStoreService';
import { store } from '../store';
import { LoginRouteRecord, router } from '../Router';
import face from '../components/fiveFaceImage.vue';
import Medusa from '@medusajs/medusa-js';
import {Customer as MCustomer} from '@medusajs/medusa';

const medusas = reactive<Medusa>(new Medusa({
  baseUrl: import.meta.env.VITE_MEDUSA_BACKEND_URL,
  maxRetries: 10,
}));
const medusa = inject<MedusaService>(ServiceKeys.MedusaJs);

type CCustomer = {skybioUid:string} & Omit<MCustomer,'password_hash'>;

const me = ref<CCustomer | null>(null);

const faceRegisterModal = ref(false);
async function doneCapture(files: Blob[])
{

  faceRegisterModal.value = false;
  store.commit('open-loading');
  await medusa?.customer.registerFace(files);
  const result = await medusas.customers.retrieve();
  if(result) me.value = result.customer as CCustomer;
  store.commit('close-loading');
}


medusas.customers.retrieve().then(result =>{
  me.value = (result.customer as CCustomer);
});
// medusa?.customer.me().then(result => {
//     me.value = result;
// });


function logout() {
    store.commit('update-token',null);
    router.push(LoginRouteRecord);
}


</script>

<template>
<section v-if="me !== null" style="background-color: #eee;">
  <div class="container py-5">
    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;">
            <h5 class="my-3">{{me.first_name}}</h5>
            <div class="d-flex justify-content-center mb-2">
              <button v-if="me.skybioUid === null" @click="()=>faceRegisterModal=true" type="button" class="btn btn-primary">Enable face login</button>
              <button @click="logout" type="button" class="btn btn-outline-secondary ms-1">Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{me.first_name}} {{me.last_name}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{me.email}}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phone</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ me.phone }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Address</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ me.billing_address }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <face v-if="faceRegisterModal" @close-modal="() => faceRegisterModal = false" @done-capture="doneCapture"></face>
</section>
</template>
 

<style>
</style>
