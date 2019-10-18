export default {
  notes: (state, getters) => {
    return state.notes;
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

  getWindowSize: (state, getters) => {
    return state.notesIndexNavigation.windowWidth;
  }
};
