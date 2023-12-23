<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { PropType, inject, reactive, ref} from 'vue';

import { store } from '../store';
import { HomeRouteRecord, RegistrationRouteRecord, router } from '../Router';
import { ServiceKeys } from '../Constants';
import { MedusaService } from '../services/MedusaStoreService';

import faceOne from '../components/oneFaceImage.vue';
import { jwtTokenManager } from '@medusajs/medusa-js';


const medusa = inject<MedusaService>(ServiceKeys.MedusaJs);
const openFaceLogin = ref(false);


function backToPrevious(){
  router.push(store.state.router ?? HomeRouteRecord);
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
            store.commit('open-loading');
            const data = await medusa?.customer.login({email:loginData.email,password:loginData.password});
            store.commit('update-token',data?.access_token);
            backToPrevious();
        } catch (err) {
            console.log(err);
            logginError.value = err;
        }
        finally
        {
          store.commit('close-loading');
        }
    }
}
const loggingIn = ref(false);
const logginError = ref<any>(null);
async function doneCapture(file: Blob){
    loggingIn.value = true;
    openFaceLogin.value = false;
    if(loginData.email.length > 0)
    {
      try {
          store.commit('open-loading');
          const data = await medusa?.customer.faceLogin({email:loginData.email,file:file});
          store.commit('update-token',data?.access_token);
          jwtTokenManager.registerJwt(data?.access_token as string,'store');
          backToPrevious();
      } catch (err) {
          console.log(err);
          logginError.value = err;
      }
      finally{
        store.commit('close-loading');
        loggingIn.value = false;
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
                  <input v-if="!loggingIn" value="Login" type="submit" id="form2Example28" class="form-control form-control-lg" />
                  <button v-if="!loggingIn" @click.prevent="()=>openFaceLogin=true" id="form2Example28" class="form-control form-control-lg">Face login</button>
                </div>
                <div v-if="logginError !== null" class="alert alert-danger">
                  <strong>{{logginError}}</strong>
                </div>
                <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Forgot password?</a></p>
                <p>Don't have an account? 
                  <router-link :to="RegistrationRouteRecord" >
                    Register Here
                  </router-link>
                </p>
              </form>
            </div>
          </div>
          <div class="col-sm-6 px-0 d-none d-sm-block">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
              alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
          </div>
        </div>
      </div>  
  <faceOne v-if="openFaceLogin" @close-modal="()=>openFaceLogin=false" @done-capture="doneCapture" />
</section>
</template>

<style>
</style>
