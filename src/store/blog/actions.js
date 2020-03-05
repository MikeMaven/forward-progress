import * as BlogApi from '../../util/BlogApi.js';
import { router } from '../../../src/router';

export default {
  saveBlog(context, payload) {
    return new Promise(resolve => {
      BlogApi.saveBlog(
        payload.title,
        payload.content,
        payload.coverImageURL,
        payload.subtitle,
        payload.isPaid,
        payload.photoGallery,
        payload.categories
      ).then(blog => {
        resolve();
      });
    });
  },

  getSingleBlogPost(context, id) {
    return new Promise(resolve => {
      if (context.loaded) {
        resolve();
      } else {
        BlogApi.getSingleBlogPost(id).then(post => {
          context.commit('setSelectedPost', post);
          resolve();
        });
      }
    });
  },

  getBlogPosts(context) {
    return new Promise(resolve => {
      if (context.loaded) {
        resolve();
      } else {
        BlogApi.getBlogPosts().then(posts => {
          context.commit('setBlogPosts', posts);
          resolve();
        });
      }
    });
  },

  getPageOfBlogPosts(context, currentPage) {
    return new Promise(resolve => {
      BlogApi.getPageOfBlogPosts(currentPage).then(result => {
        context.commit('setPageOfBlogPosts', result.fetchedPosts);
        context.commit('setNumberOfPages', result.postCount);
        resolve();
      });
    });
  },

  setCoverImage(context, imageURL) {
    return new Promise(function(resolve) {
      context.commit('setCoverImage', imageURL);
      resolve();
    });
  },

  createNewCategory(context, newCategory) {
    return new Promise(function(resolve) {
      context.commit('addNewCategory', newCategory);
      resolve();
    });
  },

  updateCategorySelection(context, selections) {
    return new Promise(function(resolve) {
      context.commit('setSelected', selections);
      resolve();
    });
  },

  setSelectedPost(context, post) {
    context.commit('setSelectedPost', post);
  },

  getAllCategories(context) {
    return new Promise(resolve => {
      BlogApi.getAllCategories().then(categories => {
        context.commit('loadAllCategories', categories);
        resolve();
      })
    })
  }
};
