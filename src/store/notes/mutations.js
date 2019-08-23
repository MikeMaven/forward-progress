export default {
  setUserNotes(state, notes) {
    state.notes = notes;
  },

  setNewNote(state, note) {
    state.notes.push(note)
  }
};
