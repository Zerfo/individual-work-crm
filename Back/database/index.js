/* @flow */
const Sequelize = require('sequelize');
const path = require('path');
const dbPath = path.resolve(__dirname, './test.sqlite');

module.exports = new Sequelize('test', '', '', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 90,
    min: 20,
    acquire: 30000,
    idle: 10000
  },

  storage: dbPath
});
