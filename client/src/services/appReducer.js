import actions from '../constants/appActions';
import * as initialState from '../constants/initialState';
import { combineReducers } from 'redux';

// Reminder to never mutate state, only return a new state object
export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.EXAMPLE:
      return Object.assign({}, state, { testState: action.testParameter });
    default:
      return state;
  }
};

const reducer = combineReducers({ appReducer });

export default reducer;
