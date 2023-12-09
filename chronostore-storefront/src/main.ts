import './style.css'
import "@egjs/vue3-flicking/dist/flicking.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import App from './App.vue'



import Medusa from '@medusajs/medusa-js';
import { MedusaStoreService } from './services/MedusaStoreService';
import { createApp } from 'vue';
import { register } from 'swiper/element/bundle';

import { ServiceKeys } from './Constants';
import { router } from './Router';

register();
const medusa = new Medusa({
    baseUrl: import.meta.env.VITE_MEDUSA_BACKEND_URL,
    maxRetries: 5,
});

const app = createApp(App);


app.use(router);
app.provide(ServiceKeys.MedusaJs,medusa);





app.mount("#app");

