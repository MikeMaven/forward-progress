/* eslint-disable */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'user_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contentType: {
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.BLOB,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('user_images'),
};
