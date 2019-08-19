'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pokemon = sequelize.define(
    'Pokemon',
    {
      name: DataTypes.STRING,
      species: DataTypes.STRING,
      ability1: DataTypes.STRING,
      ability1Description: DataTypes.STRING,
      ability2: DataTypes.STRING,
      ability2Description: DataTypes.STRING,
      ability3: DataTypes.STRING,
      ability3Description: DataTypes.STRING,
      pokedexNumber: DataTypes.INTEGER,
      sprite: DataTypes.STRING,
      sprites: DataTypes.JSON,
      type1: DataTypes.STRING,
      type2: DataTypes.STRING,
      pokedexEntry: DataTypes.STRING,
      height: DataTypes.DECIMAL,
      weight: DataTypes.DECIMAL,
      statHp: DataTypes.INTEGER,
      statAttack: DataTypes.INTEGER,
      statDefense: DataTypes.INTEGER,
      statSpecialAttack: DataTypes.INTEGER,
      statSpecialDefense: DataTypes.INTEGER,
      statSpeed: DataTypes.INTEGER,
      jsonPokemon: DataTypes.JSON,
      jsonSpecies: DataTypes.JSON,
      chainId: DataTypes.INTEGER,
      statTotal: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
    },
    {},
  );
  Pokemon.associate = function(models) {
    // associations can be defined here
  };
  return Pokemon;
};
