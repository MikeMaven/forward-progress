export default {
  notes: (state, getters) => {
    return state.notes;
  },

  getTagsInMyNotes: (state, getters) => {
    return state.tagsInMyNotes;
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
  }
};
