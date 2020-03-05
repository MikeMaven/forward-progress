export default {
  getAllCategories: (state, getters) => {
    return state.allCategories;
  },

  getSelectedCategories: (state, getters) => {
    return state.selectedCategories;
  },

  getPageOfPosts: (state, getters) => {
    return state.pageOfBlogPosts;
  },

  getNumberOfPages: (state, getters) => {
    return state.numberOfPages;
  },

  getLatestPosts: (state, getters) => {
    return state.blogPosts;
  },

  selectedPost: (state, getters) => {
    return state.selectedPost;
  }
};
