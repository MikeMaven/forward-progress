export default {
  setCoverImage(state, imageURL) {
    state.coverImageURL = imageURL;
  },

  addNewTag(state, newTag) {
    state.allTags.push(newTag);
    state.selectedTags.push(newTag);
  },

  setSelected(state, newSelections) {
    state.selectedTags = newSelections;
  },

  setPageOfBlogPosts(state, blogPosts) {
    state.pageOfBlogPosts = blogPosts;
  },

  setNumberOfPages(state, blogPostCount) {
    const pageCount = Math.ceil(blogPostCount / 10);
    state.numberOfPages = pageCount;
  },

  setBlogPosts(state, blogPosts) {
    state.blogPosts = blogPosts;
  }
};
