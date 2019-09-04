export default {
  setUserNotes(state, notes) {
    state.notes = notes;
    state.allNotes = notes;
  },

  setTagsInMyNotes(state, tags) {
    state.tagsInMyNotes = tags;
  },

  selectedTagFilter(state, tags) {
    state.selectedTagsInMyNotes = tags;
    let filteredNotes = [];
    state.allNotes.forEach(note => {
      let tagScore = 0;
      tags.forEach(tag => {
        if (
          note.tags.find(noteTag => {
            return noteTag.id === tag.id;
          })
        ) {
          tagScore++;
        }
      });
      if (tagScore === tags.length) {
        filteredNotes.push(note);
      }
    });
    state.notes = filteredNotes;
  },

  filterType(state, filterType) {
    state.filterType = filterType;
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
