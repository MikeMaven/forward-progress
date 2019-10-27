import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../router';
import { dataService, decode, sessionService, isBrowser } from '../services';
import { ACCESS_TOKEN } from '../constants';
import posts from './posts';
import notes from './notes/index';
import blog from './blog/index';
import userInfo from './userInfo/index';

Vue.use(Vuex);

function createStore() {
  return new Vuex.Store({
    modules: {
      posts,
      notes,
      userInfo,
      blog
    },
    state: {
      isAuthenticated: false,
      user: null,
      error: '',
      appData: isBrowser && window.__PRELOADEDSTATE__
    },
    getters: {
      isAuthenticated: state => {
        return state.isAuthenticated;
      },
      user: state => {
        return state.user;
      },
      isAdmin: state => {
        if (state.user) {
          return state.user.isAdmin;
        } else {
          return false;
        }
      },
      appData: state => {
        return state.appData;
      },
      error: state => {
        return state.error;
      }
    },
    actions: {
      logout(context) {
        context.commit('logout');
      },
      login(context, credentials) {
        return dataService
          .post('api/auth/signin', credentials)
          .then(res => {
            context.commit('login', res.data);
            return res.data;
          })
          .catch(err => {
            context.state.error = err.response.data
              ? err.response.data[0]
              : 'Login error';
          });
      },
      register(context, data) {
        return dataService
          .post('api/auth/signup', data)
          .then(res => {
            return res.data;
          })
          .catch(err => {
            context.state.error = err.response.data
              ? err.response.data[0]
              : 'Login error';
          });
      }
    },
    mutations: {
      logout(state) {
        if (typeof window !== 'undefined') {
          sessionService.clear();
          router.push('/');
        }
        state.isAuthenticated = false;
        state.user = null;
      },
      login(state, token) {
        if (typeof window !== 'undefined') {
          sessionService.set(ACCESS_TOKEN, token);
          router.push('/');
        }
        state.isAuthenticated = true;
        state.user = decode(token);
      }
    }
  });
}

export const store = createStore();
