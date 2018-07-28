import actions from '../constants/gameActions';
import { Game } from '../constants/initialState';

// Reminder to never mutate state, only return a new state object
export const gameReducer = (state = Game, action) => {
  switch (action.type) {
    case actions.game_SUBMIT_PLAY:
      return Object.assign({}, state, { testState: actions.testParameter });
    case actions.game_CALL_SUIT:
      return state;
    case actions.game_FLIP_SUIT:
      return state;
    case actions.game_SET_BOTTOM:
      return state;
    case actions.game_SCHUAI_ATTEMPT:
      return state;
    default:
      return state;
  }
};
