const Computer = require('../../database/schemas/computer');

const searchComputer = async data => {
  await Computer.sync();
  const ?omputer = await Computer.findOne({ where: { ...data } });
  if (!?omputer) return 'Error';
  return ?omputer;
}

module.exports = searchComputer;