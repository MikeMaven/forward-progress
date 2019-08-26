export default {
  setUserNotes(state, notes) {
    state.notes = notes;
  },

  setNewNote(state, note) {
    state.notes.push(note);
  },

  setNoteToEdit(state, noteToEdit) {
    state.noteToEdit = noteToEdit;
  }
};
