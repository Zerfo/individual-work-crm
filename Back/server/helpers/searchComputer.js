const Computer = require('../../database/schemas/computer');

const userComputer = async data => {
  await Computer.sync();
  const computer = await Computer.findAll({ where: { ...data } });
  if (!computer) return 'Error';
  return computer;
}
const getAllComputer = async () => {
  await Computer.sync();
  const computer = await Computer.findAll();
  if (!computer) return 'Error';
  return computer;
}

module.exports = userComputer;
module.exports = getAllComputer;

module.exports = {
  userComputer,
  getAllComputer
}
