import axios from 'axios'

import * as CodeApi from "./CodeApi.js"

export function getUserNotes() {
  const url = '/api/myNotes'

  const options = Object.assign({}, CodeApi.config.axiosDefaults, {method: 'get', url: url, responseType: 'json'})

  return axios(options).then((response) => CodeApi.unrollApiResponse(response.data))
}
