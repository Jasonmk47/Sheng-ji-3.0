import actions from '../constants/appActions';
import * as initialState from '../constants/initialState';

// Reminder to never mutate state, only return a new state object
export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.EXAMPLE:
      return Object.assign({}, state, { testState: action.testParameter });
    default:
      return state;
  }
};

//This could be split into a different reducer but whatever, it's not important rn
export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.EXAMPLE:
      return Object.assign({}, state, { testState: action.testParameter });
    default:
      return state;
  }
};
