'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Pokemons', 'statTotal', Sequelize.INTEGER);
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Pokemons', 'statTotal');
  }
};
//# sourceMappingURL=20190313085451-add_stats_total.js.map