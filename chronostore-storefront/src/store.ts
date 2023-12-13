import { createStore } from 'vuex';


const token = localStorage.getItem('access-token');
const store = createStore({
    state () {
      return {
        token: token
      }
    },
    mutations: {
      'update-token': (state, newToken: string|null) => {
        state.token = newToken;
      }
    },
    getters: {
      token: state => state.token
    }
});

export {
    store
}