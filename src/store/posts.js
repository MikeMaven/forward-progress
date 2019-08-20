import { dataService, isBrowser } from '../services';

const defaultState = {
  posts: [],
  categoryId: 0
};

const state =
  isBrowser && window.__INITIAL_STATE__
    ? window.__INITIAL_STATE__.postsModule
    : defaultState;

const getters = {
  posts: state => state.posts
};

const actions = {
  updateCategory(context, categoryId) {
    return dataService
      .get(
        `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${categoryId}`
      )
      .then(response => {
        context.commit('updateCategory', { categoryId, posts: response.data.events });
      });
  }
};

const mutations = {
  updateCategory(state, category) {
    state.categoryId = category.categoryId;
    state.posts = category.posts;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
