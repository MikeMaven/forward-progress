import * as NotesApi from '../../util/NotesApi.js';
import { router } from '../../../src/router';

export default {
  getUserNotes(context) {
    return new Promise(resolve => {
      if (context.loaded) {
        resolve();
      } else {
        NotesApi.getUserNotes().then(response => {
          context.commit('setUserNotes', response.user.notes);
          context.commit('setTagsInMyNotes', response.includedTags);
          context.commit('setSearchObject', response.searchObject);
          resolve();
        });
      }
    });
  },

  getSharedNotes(context) {
    return new Promise(resolve => {
      NotesApi.getSharedNotes().then(response => {
        context.commit('setSharedNotes', response);
        resolve();
      });
    });
  },

  getAdminNotes(context) {
    return new Promise(resolve => {
      NotesApi.getAllNotes().then(response => {
        context.commit('setUserNotes', response);
      });
    });
  },

  setSelectedTagsInMyNotes(context, updatedTagSelection) {
    return new Promise(function(resolve) {
      context.commit('selectedTagFilter', updatedTagSelection);
      resolve();
    });
  },

  setFilterType(context, filterType) {
    return new Promise(function(resolve) {
      context.commit('filterType', filterType);
    });
  },

  setFilterToggle(context, newValue) {
    return new Promise(function(resolve) {
      context.commit('filterToggle', newValue);
    });
  },

  starToggle(context, starData) {
    return new Promise(function(resolve) {
      NotesApi.starToggle(starData.id, starData.starred).then(response => {
        context.commit('setStarredNote', response);
        resolve();
      });
    });
  },

  selectNote(context, note) {
    return new Promise(function(resolve) {
      context.commit('selectNote', note);
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
        context.commit('selectNote', note);
        resolve(note);
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
        context.commit('selectNote', note);
        resolve(note);
      });
    });
  },

  updateSelectionUponDeletion(context, id) {
    return new Promise(function(resolve) {
      context.commit('updateSelectedUponDeletion', id);
      resolve();
    });
  },

  deleteNote(context, payload) {
    return new Promise(function(resolve) {
      NotesApi.deleteNote(payload.id, payload.source).then(noteId => {
        if (payload.source === 'index') {
          context.commit('removeFromNotesList', noteId);
        } else if (payload.source === 'editor') {
          router.push('/notes');
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
  },

  getUsersToShareWith(context) {
    return new Promise(function(resolve) {
      NotesApi.getUsersToShareWith().then(response => {
        context.commit('setUsersToShareWith', response);
        resolve();
      });
    });
  },

  updateUserSelection(context, updatedUsers) {
    return new Promise(function(resolve) {
      context.commit('setSelectedUsers', updatedUsers);
      resolve();
    });
  },

  submitShares(context, sharedUsers, noteId, creatorId) {
    return new Promise(function(resolve) {
      NotesApi.submitShares(sharedUsers, noteId, creatorId).then(response => {
        resolve(response);
      });
    });
  },

  updateWindowWidth(context, newWidth) {
    return new Promise(function(resolve) {
      context.commit('updateWidth', newWidth);
      resolve();
    });
  },

  toggleSideBar(context, value) {
    return new Promise(function(resolve) {
      context.commit('toggleSideBar', value);
      resolve();
    });
  }
};
