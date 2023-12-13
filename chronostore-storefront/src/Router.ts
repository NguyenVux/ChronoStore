import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";
import Home from './Pages/Home.vue';
import Product from './Pages/Product.vue';
import Login from './Pages/Login.vue';
import Profile from './Pages/Profile.vue';


export const ProductDetailRouteRecord : RouteRecordRaw =  { 
    path: "/product/:id",
    name:"product detail",
    component: Product
}
export const ProfileRouteRecord : RouteRecordRaw =  {
    path: "/profile",
    name:"profile",
    component: Profile
}
export const HomeRouteRecord : RouteRecordRaw =  {
    path: "/",
    name:"home",
    component: Home
}
export const LoginRouteRecord : RouteRecordRaw =  {
    path: "/login/",
    name:"login",
    component: Login,
}

const routes: RouteRecordRaw[] = [
    ProductDetailRouteRecord,
    LoginRouteRecord,
    ProfileRouteRecord,
    HomeRouteRecord,
];



export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

