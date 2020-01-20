/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BlogPosts', [
      {
        title: 'Best Coffee Shops',
        body: 'Starbucks, Dunkin Donuts, Peets Coffee',
        createdAt: new Date,
        updatedAt: new Date,
        Author: 2,
        coverImageURL: null,
        subTitle: 'Best List',
        isPaid: false,
        photoGallery: null
      },
      {
        title: 'Best Movie Theaters',
        body: 'Franklin Theatres, IMAX Cinema, Regal Movies',
        createdAt: new Date,
        updatedAt: new Date,
        Author: 2,
        coverImageURL: null,
        subTitle: 'Best List',
        isPaid: false,
        photoGallery: null
      }
    ])
    .catch(e => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BlogPosts', null, {});
  }
};
