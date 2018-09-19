const Sequelize = require('sequelize');
const sequelize = require('../');

module.exports = sequelize.define('user', {
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  },
  banned: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      len: [4, 20]
    }
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [8, 999]
    }
  },
  firstName: {
    type: Sequelize.TEXT,
    validate: {
      is: ["^[a-z]+$",'i'],
      len: [4, 20]
    }
  },
  lastName: {
    type: Sequelize.TEXT,
    validate: {
      is: ["^[a-z]+$",'i'],
      len: [4, 20]
    }
  },
  avatarURL: {
    type: Sequelize.TEXT
  },
  refreshToken: {
    type: Sequelize.TEXT
  }
});
