import actions from '../constants/accountActions';
import { Account } from '../constants/initialState';

// Reminder to never mutate state, only return a new state object
export const accountReducer = (state = Account, action) => {
  switch (action.type) {
    case actions.EXAMPLE:
      return Object.assign({}, state, {
        testState: actions.testParameter,
      });
    case actions.account_LOGIN:
      return state;
    case actions.account_LOGOUT:
      return state;
    case actions.account_REGISTER:
      return state;
    default:
      return state;
  }
};
