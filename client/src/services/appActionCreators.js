import actions from '../constants/appActions';

export const exampleActionCreator = testParameter => {
  return {
    type: actions.EXAMPLE,
    testParameter,
  };
};
