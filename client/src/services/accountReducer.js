import accountActions from '../constants/accountActions';
import { Account } from '../constants/initialState';

// Reminder to never mutate state, only return a new state object
export const accountReducer = (state = Account, action) => {
  switch (action.type) {
    case accountActions.EXAMPLE:
      return Object.assign({}, state, {
        testState: accountActions.testParameter,
      });
    default:
      return state;
  }
};
