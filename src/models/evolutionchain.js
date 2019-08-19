'use strict';
module.exports = (sequelize, DataTypes) => {
  const EvolutionChain = sequelize.define('EvolutionChain', {
    chainId: DataTypes.INTEGER,
    json: DataTypes.JSON
  }, {});
  EvolutionChain.associate = function(models) {
    // associations can be defined here
  };
  return EvolutionChain;
};