import { RouteRecordSingleView } from 'vue-router';
import { createStore } from 'vuex';


const token = localStorage.getItem('access-token');
export interface state {
  token:string | null,
  router: RouteRecordSingleView | null,
  modal: {
    loading: number
  }
}
const store = createStore({
    state (): state {
      return {
        token: token,
        router: null,
        modal:{
          loading:0
        }
      }
    },
    mutations: {
      'update-token': (state, newToken: string|null) => {
        state.token = newToken ?? null;
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
      }
    },
});

export {
    store
}