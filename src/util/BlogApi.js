import axios from 'axios';

import * as CodeApi from './CodeApi.js';

export function saveBlog(title, body, imageURL, subTitle, isPaid, photoGallery, categories) {
  const url = '/api/blog/new';
  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'post',
    url: url,
    responseType: 'json',
    data: { title, body, imageURL, subTitle, isPaid, photoGallery, categories }
  });

  return axios(options).then(response =>
    CodeApi.unrollApiResponse(response.data)
  );
}

export function getBlogPosts() {
  const url = '/api/blog';

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json'
  });

  return axios(options).then(response =>
    CodeApi.unrollApiResponse(response.data)
  );
}

export function getSingleBlogPost(id) {
  const url = `/api/blog/${id}`

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json'
  });

  return axios(options).then(response => {
    return response.data
  });
}

export function getPageOfBlogPosts(currentPage) {
  const url = `/api/getPageOfBlogPosts/${currentPage}`;

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json',
    data: { currentPage }
  });

  return axios(options).then(response => {
    return response.data
  });
}

export function getAllCategories() {
  const url = '/api/blogs/categories'

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json'
  });

  return axios(options).then(response => {
    return response.data
  });
}
