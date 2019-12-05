import axios from 'axios';

import * as CodeApi from './CodeApi.js';

export function saveBlog(title, body, imageURL, subTitle, isPaid) {
  const url = '../api/newBlog';
  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'post',
    url: url,
    responseType: 'json',
    data: { title, body, imageURL, subTitle, isPaid }
  });

  return axios(options).then(response =>
    CodeApi.unrollApiResponse(response.data)
  );
}

export function getBlogPosts() {
  const url = '../api/public/getBlogPosts';

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json'
  });

  return axios(options).then(response => {
    CodeApi.unrollApiResponse(response);
  });
}

export function getPageOfBlogPosts(currentPage) {
  const url = `../api/public/getPageOfBlogPosts/${currentPage}`;

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json',
    data: { currentPage }
  });

  return axios(options).then(response =>
    CodeApi.unrollApiResponse(response.data)
  );
}
