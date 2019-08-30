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
          context.commit('loadSelectedTags', response.tags);
        });
      }
    });
  },

  saveNote(context, payload) {
    let newTags = payload.allTags.filter(tag => tag.new);

    return new Promise(resolve => {
      NotesApi.saveNote(
        payload.title,
        payload.body,
        payload.tags,
        newTags
      ).then(note => {
        context.commit('setNewNote', note);
        router.push('/notes');
        resolve();
      });
    });
  },

  editNote(context, payload) {
    let newTags = payload.allTags.filter(tag => tag.new);

    return new Promise(function(resolve) {
      NotesApi.editNote(
        payload.title,
        payload.body,
        payload.id,
        payload.tags,
        newTags
      ).then(note => {
        context.commit('setNewNote', note);
        router.push('/notes');
        resolve();
      });
    });
  },

  deleteNote(context, payload) {
    return new Promise(function(resolve) {
      NotesApi.deleteNote(payload.id, payload.source).then(noteId => {
        if (payload.source === 'index') {
          context.commit('removeFromNotesList', noteId);
        }
        resolve();
      });
    });
  },

  updateTagSelection(context, selections) {
    return new Promise(function(resolve) {
      context.commit('setSelected', selections);
      resolve();
    });
  },

  clearTagSelection(context) {
    return new Promise(function(resolve) {
      context.commit('clearSelected');
      resolve();
    });
  },

  getAllTags(context) {
    return new Promise(function(resolve) {
      NotesApi.getAllTags().then(tags => {
        context.commit('loadAllTags', tags);
        resolve();
      });
    });
  },

  createNewTag(context, newTag) {
    return new Promise(function(resolve) {
      context.commit('addNewTag', newTag);
      resolve();
    });
  }
};
