'use strict';
module.exports = (sequelize, DataTypes) => {
  const Search = sequelize.define('Search', {
    userId: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Search.associate = function(models) {
    // associations can be defined here
  };
  return Search;
};