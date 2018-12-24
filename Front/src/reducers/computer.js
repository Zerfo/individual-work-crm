import computerConstants from '../constants/computer';

const defaultComputerStore = {
  computer: null,
  computers: null,
  err: null
};

export default function computerStore (store = defaultComputerStore, action) {
  switch (action.type) {
  case computerConstants.SUCCESS_GET_USER_COMPUTER:
    return {
      ...store,
      computer: {
        ...action.payload,
        specifications: JSON.parse(action.payload.specifications)
      }
    };
  case computerConstants.FAIL_GET_USER_COMPUTER:
    return {
      ...store,
      err: action.err
    };
  case computerConstants.SUCCESS_GET_USER_COMPUTERS:
    const computers = action.payload.map(item => ({
      ...item,
      specifications: JSON.parse(item.specifications)
    }));
    return {
      ...store,
      computers
    };
  case computerConstants.FAIL_GET_USER_COMPUTERS:
    return {
      ...store,
      err: action.err
    };
  default:
    return store;
  }
}
