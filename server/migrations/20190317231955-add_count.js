'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Pokemons', 'count', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Pokemons', 'count');
  }
};
//# sourceMappingURL=20190317231955-add_count.js.map