import * as UserInfoApi from '../../util/UserInfoApi.js';
import { router } from '../../../src/router';

export default {
  fetchProfile(context) {
    return new Promise(resolve => {
      UserInfoApi.getUserProfile().then(response => {
        context.commit('setUserProfile', response)
        resolve();
      })
    })
  }
};
