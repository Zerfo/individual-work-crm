const Sequelize = require('sequelize');
const sequelize = require('../');

module.exports = sequelize.define('computer', {
  specifications: {
    type: Sequelize.JSON,
    allowNull: false
  },
  pictureURL: {
    type: Sequelize.TEXT
  },
  underRepair: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  },
  claimID: {
    type: Sequelize.INTEGER
  },
  userID: {
    type: Sequelize.INTEGER
  },
  cabinetNumber: {
    type: Sequelize.INTEGER
  }
});
