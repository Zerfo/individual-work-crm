import claimsConstants from '../constants/claims';

const defaultClaimsStore = {
  claims: [],
  err: null
};

export default function claimsStore (store = defaultClaimsStore, action) {
  switch (action.type) {
  case claimsConstants.SUCCESS_GET_USER_CLAIMS:
    return {
      ...store,
      claims: action.payload
    };
  case claimsConstants.FAIL_GET_USER_CLAIMS:
    return {
      ...store,
      err: action.err
    };
  default:
    return store;
  }
}
