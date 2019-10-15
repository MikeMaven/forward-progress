'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('UserSharedNotes', 'CreatorId'),
      queryInterface.addColumn(
        'UserSharedNotes',
        'CreatorId',
        Sequelize.INTEGER
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('UserSharedNotes', 'CreatorId'),
      queryInterface.addColumn(
        'UserSharedNotes',
        'CreatorId',
        Sequelize.INTEGER
      )
    ]);
  }
};
