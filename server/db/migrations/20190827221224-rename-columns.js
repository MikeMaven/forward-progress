'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('NoteTags', 'noteId', 'NoteId'),
      queryInterface.renameColumn('NoteTags', 'tagId', 'TagId')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('NoteTags', 'NoteId', 'noteId'),
      queryInterface.renameColumn('NoteTags', 'TagId', 'tagId')
    ]);
  }
};
