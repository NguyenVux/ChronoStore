<script lang="ts" setup>
import { ServiceKeys } from '../Constants';
import { inject, ref } from 'vue';
import { Customer, MedusaService } from '../services/MedusaStoreService';
import { store } from '../store';
import { LoginRouteRecord, router } from '../Router';
import face from '../components/fiveFaceImage.vue';

const medusa = inject<MedusaService>(ServiceKeys.MedusaJs);

const me = ref<Customer | null>(null);

const faceRegisterModal = ref(false);
async function doneCapture(files: Blob[])
{
    // medusa?.customer.registerFace(files);
    // faceRegisterModal.value = false;
    // medusa?.customer.me().then(result => {
    //     me.value = result;
    // });
}

if(store.state.token === null)
{
    router.push(LoginRouteRecord);
}
else {
    medusa?.customer.me().then(result => {
        me.value = result;
    });
}

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
              <button v-if="true || me.skybioUid === null" @click="()=>faceRegisterModal=true" type="button" class="btn btn-primary">Enable face login</button>
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
