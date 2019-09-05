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
    const selectedTagLength = tags.length;
    let filteredNotes = new Set([]);
    if (state.filterType === 'anyTags' && selectedTagLength > 0) {
      tags.forEach(tag => {
        if (state.searchObject.tagLookUpObject[tag.name]) {
          state.searchObject.tagLookUpObject[tag.name].forEach(id => {
            filteredNotes.add(state.searchObject.noteLookUpObject[id]);
          });
        }
      });
      filteredNotes = Array.from(filteredNotes);
    } else if (state.filterType === 'allTags' && selectedTagLength > 0) {
      let tagScore = {};
      tags.forEach(tag => {
        if (state.searchObject.tagLookUpObject[tag.name]) {
          state.searchObject.tagLookUpObject[tag.name].forEach(id => {
            if (tagScore[state.searchObject.noteLookUpObject[id].id]) {
              tagScore[state.searchObject.noteLookUpObject[id].id] += 1;
            } else {
              tagScore[state.searchObject.noteLookUpObject[id].id] = 1;
            }
          });
        }
      });
      const noteIdArray = Object.keys(tagScore);
      noteIdArray.forEach(noteId => {
        if (tagScore[noteId] === selectedTagLength) {
          filteredNotes.add(state.searchObject.noteLookUpObject[noteId]);
        }
      });
      filteredNotes = Array.from(filteredNotes);
    } else if (selectedTagLength === 0) {
      debugger;
      filteredNotes = state.allNotes;
    }
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
