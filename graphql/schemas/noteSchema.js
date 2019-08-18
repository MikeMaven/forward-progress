var NoteModel = require('../../server/db/models').Note;

const noteType = `type Note {
  id: ID!
  title: String!
  body: String!
  createdAt: GraphQLDate
  updatedAt: GraphQLDate
}`;

const noteQueries = `notes: [Note]
note(id: Int!) : Note`;

const noteMutations = `addNote (
    title: String!
    body: String!
  ): Note
  updateNote (
    id: ID!
    title: String!
    body: String!
  ): Note
  removeNote (
    id: ID!
  ) : Note`;

const notes = () => {
  const notes = NoteModel.findAll({
    order: [['createdAt', 'DESC']]
  });
  if (!notes) {
    throw new Error('Error');
  }
  return notes;
};

const note = (root, params) => {
  const noteDetails = NoteModel.findByPk(params.id);
  if (!noteDetails) {
    throw new 'Error'();
  }
  return noteDetails;
};

const addNote = (root, params) => {
  const noteModel = new NoteModel(params);
  const newNote = noteModel.save();
  if (!newNote) {
    throw new Error('Error');
  }
  return newNote;
};

const updateNote = (root, params) => {
  return NoteModel.findByPk(params.id).then(note => {
    if (!note) {
      throw new Error('Not Found');
    }
    return note
      .update({
        title: params.title || note.title,
        body: params.body || note.body,
      })
      .then(() => {
        return note;
      })
      .catch(error => {
        throw new Error(error);
      });
  });
};

const removeNote = (root, params) => {
  return NoteModel.findByPk(params.id).then(note => {
    if (!note) {
      throw new Error('Not found');
    }
    return note
      .destroy()
      .then(() => {
        return note;
      })
      .catch(error => {
        throw new Error(error);
      });
  });
};

module.exports = {
  noteType,
  noteQueries,
  noteMutations,
  notes,
  note,
  addNote,
  updateNote,
  removeNote
};
