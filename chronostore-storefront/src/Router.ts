import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";
import Home from './Pages/Home.vue';
import Product from './Pages/Product.vue';
import Login from './Pages/Login.vue';


export const ProductDetailRouteRecord : RouteRecordRaw =  { 
    path: "/product/:id",
    name:"product detail",
    component: Product
}
export const HomeRouteRecord : RouteRecordRaw =  {
    path: "/",
    name:"home",
    component: Home
}

const routes: RouteRecordRaw[] = [
    ProductDetailRouteRecord,
    { 
        path: "/login/",
        name:"login",
        component: Login
    },
    HomeRouteRecord
];



export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

