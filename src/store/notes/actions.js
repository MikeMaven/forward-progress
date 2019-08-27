import * as NotesApi from '../../util/NotesApi.js';
import { router } from '../../../src/router';

export default {
  getUserNotes(context) {
    return new Promise(resolve => {
      if (context.loaded) {
        resolve();
      } else {
        NotesApi.getUserNotes().then(response => {
          context.commit('setUserNotes', response);
          resolve();
        });
      }
    });
  },

  getNote(context, payload) {
    return new Promise(resolve => {
      if (context.loaded) {
        resolve();
      } else {
        NotesApi.getEditNote(payload.id).then(response => {
          context.commit('setNoteToEdit', response);
        });
      }
    });
  },

  saveNote(context, payload) {
    return new Promise(resolve => {
      NotesApi.saveNote(payload.title, payload.body).then(note => {
        context.commit('setNewNote', note);
        router.push('/notes');
        resolve();
      });
    });
  },

  editNote(context, payload) {
    return new Promise(function(resolve) {
      NotesApi.editNote(payload.title, payload.body, payload.id).then(note => {
        context.commit('setNewNote', note);
        router.push('/notes');
        resolve();
      });
    });
  },

  updateTagSelection(context, selections) {
    context.commit('setSelected', selections);
  }
};
