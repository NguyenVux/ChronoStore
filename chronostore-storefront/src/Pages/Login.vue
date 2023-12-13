<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { inject, reactive, ref} from 'vue';

import { store } from '../store';
import { HomeRouteRecord, ProfileRouteRecord, router } from '../Router';
import { ServiceKeys } from '../Constants';
import { MedusaService } from '../services/MedusaStoreService';

import faceOne from '../components/oneFaceImage.vue';


const medusa = inject<MedusaService>(ServiceKeys.MedusaJs);
const openFaceLogin = ref(false);

function doneCapture(file: Blob[]) {
    console.log(file);
}
if(store.state.token !== null)
{
    router.push(ProfileRouteRecord);
}

const loginData = reactive({
    email:'',
    password:''
});

const rules = {
    email: { required,email },
    password:{ required }
};

const vuelidate = useVuelidate(rules,loginData);

async function submit(){
    const valid = await vuelidate.value.$validate();
    if(valid)
    {
        try {
            const data = await medusa?.customer.login({email:loginData.email,password:loginData.password});
            store.commit('update-token',data?.access_token);
            router.push(HomeRouteRecord);
        } catch (err) {
            console.log(err);
        }
    }
}


</script>

<template>
<section class="vh-100">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6 text-black">
            <div class="px-5 ms-xl-4">
              <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i>
              <span class="h1 fw-bold mb-0">Logo</span>
            </div>
            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form @submit.prevent="submit" style="width: 23rem;">
                <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Log in</h3>
                <div class="form-outline mb-4">
                  <input autocomplete="email"  v-model="loginData.email" type="email" id="formEmail" class="form-control form-control-lg" />
                  <label class="form-label" for="formEmail">Email address</label>
                </div>
                <div class="form-outline mb-4">
                  <input autocomplete="current-password"  v-model="loginData.password" type="password" id="formPassword" class="form-control form-control-lg" />
                  <label class="form-label" for="formPassword">Password</label>
                </div>
      
                <div class="pt-1 mb-4">
                  <!-- <input value="Login" type="submit" id="form2Example28" class="form-control form-control-lg" /> -->
                  <button @click.prevent="()=>openFaceLogin=true" id="form2Example28" class="form-control form-control-lg">Face login</button>
                </div>
                <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
                <p>Don't have an account? <a href="#!" class="link-info">Register here</a></p>
              </form>
            </div>
          </div>
          <div class="col-sm-6 px-0 d-none d-sm-block">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
              alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
          </div>
        </div>
      </div>  
  <face-one v-if="openFaceLogin" @close-modal="()=>openFaceLogin=false" @done-capture="doneCapture" />
</section>
</template>

<style>
</style>
