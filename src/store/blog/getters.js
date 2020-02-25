export default {
  coverImageURL: (state, getters) => {
    return state.coverImageURL;
  },

  getAllTags: (state, getters) => {
    return state.allTags;
  },

  getSelectedTags: (state, getters) => {
    return state.selectedTags;
  },

  getPageOfPosts: (state, getters) => {
    return state.pageOfBlogPosts;
  },

  getNumberOfPages: (state, getters) => {
    return state.numberOfPages;
  },

  getLatestPosts: (state, getters) => {
    return state.blogPosts;
  }
};
