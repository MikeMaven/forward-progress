/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Contents', [
    { id: 1, key: 'app_title' },
    { id: 2, key: 'app_description' },
    { id: 3, key: 'app_repo_url' },
    { id: 4, key: 'app_nav_home' },
    { id: 5, key: 'app_nav_about' },
    { id: 6, key: 'app_nav_login' },
    { id: 7, key: 'app_nav_logout' },
    { id: 8, key: 'app_nav_register' },
    { id: 9, key: 'app_nav_admin' },
    { id: 10, key: 'app_nav_examples' },
  ], {}).catch((e) => Promise.resolve()),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Contents', null, {}),
};
