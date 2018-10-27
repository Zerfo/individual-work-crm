const User = require('../../database/schemas/user');

const searchUser = async data => {
  await User.sync();
  const user = await User.findOne(data);
  if (!user) return 'Error';
  return user;
}

module.exports = searchUser;