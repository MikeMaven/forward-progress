/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BlogPosts', [
      {
        title: 'Best Coffee Shops',
        body: 'Top 3 Best Coffee Shops \nStarbucks \n Dunkin\' Donuts \n, Peet\'s Coffee \n',
        Author: 1,
        coverImageURL: null,
        subTitle: 'Who drinks tea anymore?',
        isPaid: false,
        photoGallery: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Best Bookstores',
        body: 'Top 5 Best Book Stores \nAmazon \nBarnes & Nobles \nBorders \nThe Strand \neBay \n',
        Author: 2,
        coverImageURL: 'https://static01.nyt.com/images/2017/05/11/t-magazine/bookstore-slide-2MCD/bookstore-slide-2MCD-superJumbo.jpg?quality=90',
        subTitle: 'From the most knowledgeable source',
        isPaid: true,
        photoGallery: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]).catch(e => Promise.resolve());
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('BlogPosts', null, {})
};
