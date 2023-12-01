import { createRouter,createWebHashHistory,RouteRecordRaw } from "vue-router";
import Home from './Pages/Home.vue';
import Product from './Pages/Product.vue';

const routes: RouteRecordRaw[] = [
    { 
        path: "/",
        name:"home",
        component: Home
    },
    { 
        path: "/product/:id",
        name:"product detail",
        component: Product
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

