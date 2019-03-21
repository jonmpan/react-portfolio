'use strict';

var generateSeedData = require('../utils/generateSeedData');

module.exports = {
  up: function up(queryInterface, Sequelize) {
    var seedArray = generateSeedData(2000, Sequelize);
    return queryInterface.bulkInsert('Searches', seedArray, {});
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
//# sourceMappingURL=20190309041416-searches-dummy-data.js.map