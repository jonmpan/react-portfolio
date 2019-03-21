'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pokemons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      species: {
        type: Sequelize.STRING,
      },
      ability1: {
        type: Sequelize.STRING,
      },
      ability1Description: {
        type: Sequelize.STRING,
      },
      ability2: {
        type: Sequelize.STRING,
      },
      ability2Description: {
        type: Sequelize.STRING,
      },
      ability3: {
        type: Sequelize.STRING,
      },
      ability3Description: {
        type: Sequelize.STRING,
      },
      pokedexNumber: {
        type: Sequelize.INTEGER,
      },
      sprite: {
        type: Sequelize.STRING,
      },
      sprites: {
        type: Sequelize.JSON,
      },
      type1: {
        type: Sequelize.STRING,
      },
      type2: {
        type: Sequelize.STRING,
      },
      pokedexEntry: {
        type: Sequelize.STRING,
      },
      height: {
        type: Sequelize.DECIMAL,
      },
      weight: {
        type: Sequelize.DECIMAL,
      },
      statHp: {
        type: Sequelize.INTEGER,
      },
      statAttack: {
        type: Sequelize.INTEGER,
      },
      statDefense: {
        type: Sequelize.INTEGER,
      },
      statSpecialAttack: {
        type: Sequelize.INTEGER,
      },
      statSpecialDefense: {
        type: Sequelize.INTEGER,
      },
      statSpeed: {
        type: Sequelize.INTEGER,
      },
      jsonPokemon: {
        type: Sequelize.JSON,
      },
      jsonSpecies: {
        type: Sequelize.JSON,
      },
      chadId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pokemons');
  },
};
