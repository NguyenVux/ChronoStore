import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Medusa from '@medusajs/medusa-js'
import { ServiceKeys } from './Constants';
import { router } from './Router';

const medusa = new Medusa({
    baseUrl: import.meta.env.VITE_MEDUSA_BACKEND_URL,
    maxRetries: 5,
});

const app = createApp(App);


app.use(router);
app.provide(ServiceKeys.MedusaJs,medusa);





app.mount("#app");

