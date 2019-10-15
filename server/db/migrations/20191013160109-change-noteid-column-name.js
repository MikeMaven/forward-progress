'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('UserSharedNotes', 'NoteID', 'NoteId')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('UserSharedNotes', 'NoteId', 'NoteID')
    ]);
  }
};
