const Claim = require('../../database/schemas/claim');

const userClaim = async userID => {
  await Claim.sync();
  const claims = await Claim.findAll({ where: userID });
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

module.exports = userClaim;
module.exports = computerClaim;
module.exports = nameClaim;

module.exports = {
  userClaim,
  computerClaim,
  nameClaim
}