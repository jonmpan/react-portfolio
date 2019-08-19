'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Searches',
      'pokedexNumber',
      Sequelize.INTEGER,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Searches', 'pokedexNumber');
  },
};
