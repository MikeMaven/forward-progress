import axios from 'axios';

import * as CodeApi from './CodeApi.js';

export function saveBlog(title, body) {
  const url = '../api/newBlog';
  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'post',
    url: url,
    responseType: 'json',
    data: { title, body }
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
    console.log(response);
    CodeApi.unrollApiResponse(response);
  });
}
