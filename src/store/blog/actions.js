import * as BlogApi from '../../util/BlogApi.js';
import { router } from '../../../src/router';

export default {
  saveBlog(context, payload) {
    return new Promise(resolve => {
      BlogApi.saveBlog(
        payload.title,
        payload.body,
        payload.imageURL,
        payload.subTitle,
        payload.isPaid
      ).then(blog => {
        resolve();
      });
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

  createNewTag(context, newTag) {
    return new Promise(function(resolve) {
      context.commit('addNewTag', newTag);
      resolve();
    });
  },

  updateTagSelection(context, selections) {
    return new Promise(function(resolve) {
      context.commit('setSelected', selections);
      resolve();
    });
  }
};
