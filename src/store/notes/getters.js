export default {
  notes: (state, getters) => {
    return state.notes;
  },

  noteToEdit: (state, getters) => {
    return state.noteToEdit;
  },

  getAllTags: (state, getters) => {
    return state.loadedTags;
  },

  getSelectedTags: (state, getters) => {
    return state.selectedTags;
  }
};
