export default {
  isAdmin: (state, getters) => {
    if (state.profile) {
      return state.profile.isAdmin
    } else {
      return false
    }
  }
};
