import computerConstants from '../constants/computer';

const defaultComputerStore = {
  computer: null,
  err: null
};

export default function computerStore (store = defaultComputerStore, action) {
  switch (action.type) {
  case computerConstants.SUCCESS_GET_USER_COMPUTER:
    return {
      ...store,
      computer: action.payload
    };
  case computerConstants.FAIL_GET_USER_COMPUTER:
    return {
      ...store,
      err: action.err
    };
  default:
    return store;
  }
}
