'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameTable('UserRole', 'Userroles'),
      queryInterface.renameColumn('Userroles', 'userid', 'UserId'),
      queryInterface.renameColumn('Userroles', 'roleid', 'RoleId')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameTable('Userroles', 'UserRole'),
      queryInterface.renameColumn('UserRole', 'UserId', 'userid'),
      queryInterface.renameColumn('UserRole', 'RoleId', 'roleid')
    ]);
  }
};
