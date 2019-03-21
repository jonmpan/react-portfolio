'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Searches', 'pokedexNumber', Sequelize.INTEGER);
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Searches', 'pokedexNumber');
  }
};
//# sourceMappingURL=20190310021203-add-pokedex-number.js.map