export default {
  coverImageURL: (state, getters) => {
    return state.coverImageURL;
  },

  getPageOfPosts: (state, getters) => {
    return state.pageOfBlogPosts;
  },

  getNumberOfPages: (state, getters) => {
    return state.numberOfPages;
  }
};
