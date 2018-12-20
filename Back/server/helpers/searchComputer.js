const Computer = require('../../database/schemas/computer');

const searchComputer = async data => {
  await Computer.sync();
  const Computer = await Computer.findOne({ where: { ...data } });
  if (!Computer) return 'Error';
  return Computer;
}

module.exports = searchComputer;