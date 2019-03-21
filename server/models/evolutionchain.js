'use strict';

module.exports = function (sequelize, DataTypes) {
  var EvolutionChain = sequelize.define('EvolutionChain', {
    chainId: DataTypes.INTEGER,
    json: DataTypes.JSON
  }, {});
  EvolutionChain.associate = function (models) {
    // associations can be defined here
  };
  return EvolutionChain;
};
//# sourceMappingURL=evolutionchain.js.map