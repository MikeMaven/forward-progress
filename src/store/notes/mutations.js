export default {
  setUserNotes(state, notes) {
    state.notes = notes;
  },

  setNewNote(state, note) {
    state.notes.push(note);
  },

  setNoteToEdit(state, noteToEdit) {
    state.noteToEdit = noteToEdit;
  },

  setSelected(state, newSelections) {
    state.selectedTags = newSelections;
  },

  clearSelected(state) {
    state.selectedTags = [];
  },

  loadSelectedTags(state, loadedSelections) {
    let tagsWithCodes = loadedSelections.map(tag => {
      tag.code = tag.id.toString();
      return tag;
    });
    state.selectedTags = tagsWithCodes;
  },

  loadAllTags(state, loadedTags) {
    let tagsWithCodes = loadedTags.map(tag => {
      tag.code = tag.id.toString();
      return tag;
    });
    state.loadedTags = tagsWithCodes;
  }
};
