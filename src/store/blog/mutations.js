export default {
  setCoverImage(state, imageURL) {
    state.coverImageURL = imageURL;
  },

  setPageOfBlogPosts(state, blogPosts) {
    state.pageOfBlogPosts = blogPosts;
  },

  setNumberOfPages(state, blogPostCount) {
    const pageCount = Math.ceil(blogPostCount / 10);
    state.numberOfPages = pageCount;
  }
};
