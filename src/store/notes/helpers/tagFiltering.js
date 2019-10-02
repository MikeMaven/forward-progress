export default function tagFiltering(state, tags) {
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
          if (tagScore[id] === selectedTagLength) {
            filteredNotes.add(state.searchObject.noteLookUpObject[id]);
          }
        });
      }
    });
    filteredNotes = Array.from(filteredNotes);
  } else if (selectedTagLength === 0) {
    filteredNotes = state.allNotes;
  }
  return filteredNotes;
}
