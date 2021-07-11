import { SET_AUTHED_USER } from '../actions/authedUser';
import { TOGGLE_DARK_THEME } from '../actions/darkTheme';
import { CHANGE_LANGUAGE } from '../actions/language';

const authedUser = (state = null, action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.user;
    case TOGGLE_DARK_THEME && state:
      return { ...state, darkTheme: !state.darkTheme };
    case CHANGE_LANGUAGE && state:
      return { ...state, language: action.language };
    default:
      return state;
  }
};

export default authedUser;
