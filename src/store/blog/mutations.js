export default {
  setCoverImage(state, imageURL) {
    state.coverImageURL = imageURL;
  },

  addNewCategory(state, newCategory) {
    state.allCategories.push(newCategory);
    state.selectedCategories.push(newCategory);
  },

  setSelected(state, newSelections) {
    state.selectedCategories = newSelections;
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
  },

  setSelectedPost(state, post) {
    state.selectedPost = post;
  },

  loadAllCategories(state, categories) {
    let categoriesWithCodes = categories.map(category => {
      category.code = category.id.toString();
      category.new = false;
      return category;
    })
    state.allCategories = categoriesWithCodes;
  }
};
