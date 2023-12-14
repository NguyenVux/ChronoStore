import { createRouter,createWebHistory,NavigationGuardNext,RouteLocationNormalized,RouteLocationRaw,RouteRecordRaw, RouteRecordSingleView } from "vue-router";
import Home from './Pages/Home.vue';
import Product from './Pages/Product.vue';
import Login from './Pages/Login.vue';
import Profile from './Pages/Profile.vue';
import Registration from './Pages/Registration.vue';
import { store } from "./store";

function MustNotLoggedInRoute(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext){
    if(store.state.token !== null)
    {
        return next(HomeRouteRecord);
    }
    next();
}



function ProtectedRoute(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext){
    if(store.state.token === null)
    {
        store.commit('update-redirect-from',to);
        next(LoginRouteRecord);
        return;
    }
    next();
}
export const ProductDetailRouteRecord : RouteRecordRaw =  { 
    path: "/product/:id",
    name:"product detail",
    component: Product
}
export const ProfileRouteRecord : RouteRecordRaw =  {
    path: "/profile",
    name:"profile",
    component: Profile,
    beforeEnter:ProtectedRoute
}
export const HomeRouteRecord : RouteRecordRaw =  {
    path: "/",
    name:"home",
    component: Home
}
export const LoginRouteRecord : RouteRecordRaw =  {
    path: "/login",
    name:"login",
    component: Login,
    beforeEnter: MustNotLoggedInRoute
}
export const RegistrationRouteRecord : RouteRecordRaw =  {
    path: "/register",
    name:"registration",
    component: Registration,
    beforeEnter: MustNotLoggedInRoute
}


const routes: RouteRecordRaw[] = [
    ProductDetailRouteRecord,
    LoginRouteRecord,
    ProfileRouteRecord,
    RegistrationRouteRecord,
    HomeRouteRecord,
];



export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

