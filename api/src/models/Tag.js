const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('tag', {
    // id: {
    //   type: DataTypes.STRING(6),
    //   primaryKey: true,
    // },
    name: {
      type: DataTypes.STRING,

      primaryKey: true,
    }
  });
};