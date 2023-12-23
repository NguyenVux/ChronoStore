import { jwtTokenManager } from '@medusajs/medusa-js';
import { RouteRecordSingleView } from 'vue-router';
import { createStore } from 'vuex';


const token = localStorage.getItem('access-token');
if(token !== null)
{
  jwtTokenManager.registerJwt(token,'store');
}
export interface state {
  token:string | null,
  router: RouteRecordSingleView | null,
  modal: {
    loading: number
  },
  cart?:any
}
const store = createStore({
    state (): state {
      return {
        token: token,
        router: null,
        modal:{
          loading:0
        },
        cart: undefined
      }
    },
    mutations: {
      'update-token': (state, newToken: string|null) => {
        state.token = newToken ?? null;
        jwtTokenManager.registerJwt(newToken ?? '','store');
      },
      'update-redirect-from': (state, location?: RouteRecordSingleView) => {
        state.router = location ?? null;
      },

      'open-loading' :(state)=>
      {
        state.modal.loading++;
      },
      'close-loading' :(state)=>
      {
        state.modal.loading = Math.max(0,state.modal.loading-1);
      },
      'update-cart' :(state, newCart?:any)=>
      {
        state.cart = newCart;
      }
    },
});

export {
    store
}