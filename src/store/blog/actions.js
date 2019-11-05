import * as BlogApi from '../../util/BlogApi.js';
import { router } from '../../../src/router';

export default {
  saveBlog(context, payload) {
    return new Promise(resolve => {
      BlogApi.saveBlog(payload.title, payload.body).then(blog => {
        resolve();
      });
    });
  },

  getBlogPosts(context) {
    return new Promise(resolve => {
      BlogApi.getBlogPosts().then(posts => {
        console.log(posts);
        resolve();
      });
    });
  }
};
