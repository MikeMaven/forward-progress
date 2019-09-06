import tagFiltering from './helpers/tagFiltering';

export default {
  setUserNotes(state, notes) {
    state.notes = notes;
    state.allNotes = notes;
  },

  setTagsInMyNotes(state, tags) {
    state.tagsInMyNotes = tags;
  },

  setSearchObject(state, searchObject) {
    state.searchObject = searchObject;
  },

  selectedTagFilter(state, tags) {
    state.selectedTagsInMyNotes = tags;
    state.notes = tagFiltering(state, tags);
  },

  filterType(state, filterType) {
    state.filterType = filterType;
    state.notes = tagFiltering(state, state.selectedTagsInMyNotes);
  },

  removeFromNotesList(state, noteId) {
    let currentNotes = state.notes;
    currentNotes = currentNotes.filter(note => {
      return note.id !== noteId;
    });
    state.notes = currentNotes;
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
      tag.new = false;
      return tag;
    });
    state.allTags = tagsWithCodes;
  },

  addNewTag(state, newTag) {
    state.allTags.push(newTag);
    state.selectedTags.push(newTag);
  }
};
