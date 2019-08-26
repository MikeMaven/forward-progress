import axios from 'axios';

import * as CodeApi from './CodeApi.js';

export function getUserNotes() {
  const url = '/api/myNotes';

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json'
  });

  return axios(options).then(response =>
    CodeApi.unrollApiResponse(response.data.notes)
  );
}

export function saveNote(title, body) {
  const url = 'api/newNote';

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'post',
    url: url,
    responseType: 'json',
    data: { title: title, body: body }
  });

  return axios(options).then(response =>
    CodeApi.unrollApiResponse(response.data.note)
  );
}

export function getEditNote(id) {
  const url = `../api/getNote/${id}`;

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json'
  });

  return axios(options).then(response => {
    return response.data;
  });
}

export function editNote(title, body, id) {
  const url = `../api/editNote`;

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'post',
    url: url,
    responseType: 'json',
    data: { title: title, body: body, id: id }
  });

  return axios(options).then(response => {
    console.log(response);
    return response.data;
  });
}
