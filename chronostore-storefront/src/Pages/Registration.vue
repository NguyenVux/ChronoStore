<script lang="ts" setup>
import { computed, inject, onMounted, reactive, toRaw } from 'vue';
import { LoginRouteRecord, router, ProfileRouteRecord } from '../Router';
import useVuelidate from '@vuelidate/core';
import { required,email,sameAs,numeric } from '@vuelidate/validators';
import { ServiceKeys } from '../Constants';
import { MedusaService } from '../services/MedusaStoreService';
import { store } from '../store';
interface registerData 
{
  firstName:string;
  lastName:string;
  phone:string;
  email:string;
  password:string;
  repeatPassword:string;
}
const formData =reactive<registerData>({
  firstName:'',
  lastName:'',
  phone:'',
  email:'',
  password:'',
  repeatPassword:'',
});
const medusa = inject<MedusaService>(ServiceKeys.MedusaJs);
const rules = computed(()=>
{
  return {
      firstName:{
        required,
      },
      lastName: {
        required,
      },
      phone: {
        required,
        numeric
      },
      email:{
        required,
        email
      },
      password:{
        required
      },
      repeatPassword:{
        required,
        sameAs: sameAs(formData.password)
      }
}
});
const vuelidate = useVuelidate(rules,formData,{$lazy: false});

onMounted(()=>{
  vuelidate.value.$touch();
});
const fields = [
  {
    name:'First name',
    vuelidateObject:vuelidate.value.firstName,
    inputType:'text',
    autocomplete: 'given-name',
  },
  {
    name:'Last name',
    vuelidateObject:vuelidate.value.lastName,
    autocomplete: 'family-name',
    inputType:'text'
  },
  {
    name:'Your phone',
    vuelidateObject:vuelidate.value.phone,
    autocomplete: 'tel-national',
    inputType:'text'
  },
  {
    name:'Your Email',
    vuelidateObject:vuelidate.value.email,
    autocomplete: 'email',
    inputType:'email'
  },
  {
    name:'password',
    vuelidateObject:vuelidate.value.password,
    autocomplete: 'new-password',
    inputType:'password'
  },
]

async function submit(){
  const result = await vuelidate.value.$validate();
  if(result)
  {
    try {
      console.log(formData);
      const data = toRaw(formData);
      await medusa?.customer.register(
        {
          first_name:data.firstName,
          last_name:data.lastName,
          email:data.email,
          phone:data.phone,
          password:data.password,
        }
      );
      const loginResult = await medusa?.customer.login({email:formData.email,password:formData.password});
      store.commit('update-token',loginResult?.access_token);
      router.push(ProfileRouteRecord);
    } catch (error) {
      console.error(error);
    }

  }
  else{
    console.error('invalid data');
  }
}
</script>
<template>
<section class="vh-100 bg-image">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Create an account</h2>

              <form>
                
                <div v-for="field in fields" :id="field.name" class="form-outline mb-4">
                  <input :autocomplete="field.autocomplete" v-model="field.vuelidateObject.$model" :type="field.inputType" :id="field.name" class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example1cg">
                    <div v-if="field.vuelidateObject.$errors.length > 0">{{field.vuelidateObject.$errors.map(e=>e.$message).join(', ')  }}</div>
                    <span>{{ field.name }}</span>
                  </label>
                </div>
                <div class="form-outline mb-4">
                  <input @change="()=>console.log('changing')" autocomplete="new-password" v-model="vuelidate.repeatPassword.$model" type="password" id="repeatPassword" class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example1cg">
                    <div v-if="vuelidate.repeatPassword.$errors.length > 0">
                      {{vuelidate.repeatPassword.$errors.map(e=>e.$message).join(', ')  }}
                    </div>
                    <span>re-enter password</span>
                  </label>
                </div>

                <div class="d-flex justify-content-center">
                  <button
                    @click.prevent="submit"
                   aria-disabled="true" 
                   :disabled="vuelidate.$error" 
                   type="button"
                   class="btn btn-lg"
                   :class="{
                    'btn-secondary':vuelidate.$error,
                    'btn-primary':!vuelidate.$error,
                   }"
                   >
                   Register
                  </button>
                </div>

                <p class="text-center text-muted mt-5 mb-0">Have already an account? 
                  <router-link :to="LoginRouteRecord" >
                    Login here
                  </router-link>
                </p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
</style>