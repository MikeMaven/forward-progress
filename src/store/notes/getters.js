export default {
  notes: (state, getters) => {
    return state.notes;
  },

  sharedNotes: (state, getters) => {
    return state.sharedNotes;
  },

  adminTestNotes: (state, getters) => {
    return state.adminTestNotes;
  },

  getTagsInMyNotes: (state, getters) => {
    return state.tagsInMyNotes;
  },

  getFilterType: (state, getters) => {
    return state.filterType;
  },

  getSelectedTagsInMyNotes: (state, getters) => {
    return state.selectedTagsInMyNotes;
  },

  noteToEdit: (state, getters) => {
    return state.noteToEdit;
  },

  getAllTags: (state, getters) => {
    return state.allTags;
  },

  getSelectedTags: (state, getters) => {
    return state.selectedTags;
  },

  getFilterToggle: (state, getters) => {
    return state.notesIndexNavigation.filterTagsOpen;
  },

  getSelectedNote: (state, getters) => {
    return state.notesIndexNavigation.selectedNote;
  },

  usersToShareWith: (state, getters) => {
    return state.notesIndexNavigation.usersToShareWith;
  },

  getSelectedUsers: (state, getters) => {
    return state.notesIndexNavigation.selectedUsers;
  },

  getWindowSize: (state, getters) => {
    return state.notesIndexNavigation.windowWidth;
  }
};
