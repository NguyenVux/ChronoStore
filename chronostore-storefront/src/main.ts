import './style.css'
import "@egjs/vue3-flicking/dist/flicking.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import App from './App.vue'

import { MedusaStoreService } from './services/MedusaStoreService';
import { createApp } from 'vue';
import { register } from 'swiper/element/bundle';

import { ServiceKeys } from './Constants';
import { router } from './Router';
import { store } from './store';

register();


const app = createApp(App);


app.use(router);
app.use(store);
app.provide(ServiceKeys.MedusaJs,MedusaStoreService);





app.mount("#app");

