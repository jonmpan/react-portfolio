'use strict';

module.exports = function (sequelize, DataTypes) {
  var Search = sequelize.define('Search', {
    userId: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Search.associate = function (models) {
    // associations can be defined here
  };
  return Search;
};
//# sourceMappingURL=search.js.map