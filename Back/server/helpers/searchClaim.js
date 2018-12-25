const Claim = require('../../database/schemas/claim');

const userClaim = async data => {
  await Claim.sync();
  const claims = await Claim.findAll({ where: { ...data } });
  if (!claims) return 'Error';
  return claims;
}

const computerClaim = async computerID => {
  await Claim.sync();
  const claims = await Claim.findAll({ where: computerID });
  if (!claims) return 'Error';
  return claims;
}
const nameClaim = async nameClaim => {
  await Claim.sync();
  const claims = await Claim.findAll({ where: nameClaim });
  if (!claims) return 'Error';
  return claims;
}

const claim = async data => {
  await Claim.sync();
  const claims = await Claim.findOne({ where: { ...data } });
  if (!claims) return 'Error';
  return claims;
}

const getAllClaim = async () => {
  await Claim.sync();
  const claims = await Claim.findAll();
  if (!claims) return 'Error';
  return claims;
}

module.exports = userClaim;
module.exports = computerClaim;
module.exports = nameClaim;
module.exports = getAllClaim;
module.exports = claim;

module.exports = {
  userClaim,
  computerClaim,
  nameClaim,
  getAllClaim,
  claim
}