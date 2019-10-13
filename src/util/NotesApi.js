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
    CodeApi.unrollApiResponse(response.data)
  );
}

export function getSharedNotes() {
  const url = '/api/sharedNotes';

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json'
  });

  return axios(options).then(response =>
    CodeApi.unrollApiResponse(response.data)
  );
}

export function getAllNotes() {
  const url = '/api/allNotes';

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json'
  });

  return axios(options).then(response =>
    CodeApi.unrollApiResponse(response.data)
  );
}

export function starToggle(id, starred) {
  const url = '/api/starToggle';

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'post',
    url: url,
    responseType: 'json',
    data: { id, starred }
  });

  return axios(options).then(response => {
    return response.data;
  });
}

export function saveNote(title, body, tags, newTags) {
  const url = 'api/newNote';

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'post',
    url: url,
    responseType: 'json',
    data: { title: title, body: body, tags: tags, newTags: newTags }
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

export function editNote(title, body, id, tags, newTags) {
  const url = `../api/editNote`;

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'post',
    url: url,
    responseType: 'json',
    data: { title: title, body: body, id: id, tags: tags, newTags: newTags }
  });

  return axios(options).then(response => {
    return response.data;
  });
}

export function deleteNote(id, source) {
  let url;
  if (source === 'index') {
    url = '/api/deleteNote';
  } else if (source === 'editor') {
    url = '../api/deleteNote';
  }

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'post',
    url: url,
    responseType: 'json',
    data: { id: id }
  });

  return axios(options).then(response => {
    return response.data;
  });
}

export function getAllTags() {
  const url = '../api/myTags';

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {
    method: 'get',
    url: url,
    responseType: 'json'
  });

  return axios(options).then(response =>
    CodeApi.unrollApiResponse(response.data)
  );
}
