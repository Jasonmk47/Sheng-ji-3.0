import gameActions from '../constants/gameActions';
import { Game } from '../constants/initialState';

// Reminder to never mutate state, only return a new state object
export const gameReducer = (state = Game, action) => {
  switch (action.type) {
    case gameActions.EXAMPLE:
      return Object.assign({}, state, { testState: gameActions.testParameter });
    default:
      return state;
  }
};
