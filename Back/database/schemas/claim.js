const Sequelize = require('sequelize');
const sequelize = require('../');

module.exports = sequelize.define('claim', {
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  computerID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  statusClaim: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  nameClaim: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  descriptionClaim: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  commentsClaim: {
    type: Sequelize.TEXT, // Массив в JSON строке
    allowNull: true
  },
  resolveClaim: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});
