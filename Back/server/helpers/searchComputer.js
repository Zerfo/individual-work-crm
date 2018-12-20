const Computer = require('../../database/schemas/computer');

const searchComputer = async data => {
  await Computer.sync();
  const сomputer = await Computer.findOne({ where: { ...data } });
  if (!сomputer) return 'Error';
  return сomputer;
}

module.exports = searchComputer;