import * as NotesApi from '../../util/NotesApi.js'

export default {
  getUserNotes(context) {
    return new Promise((resolve) => {
      if (context.loaded) {
        resolve()
      }
      else {
        NotesApi.getUserNotes().then((response) => {
          context.commit('setUserNotes', response)
          resolve()
        })
      }
    })
  }
};
