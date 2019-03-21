'use strict';
var generateSeedData = require('../utils/generateSeedData');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArray = generateSeedData(2000, Sequelize);
    return queryInterface.bulkInsert('Searches', seedArray, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
