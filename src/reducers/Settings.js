import {SETTINGS_USERNAME_SERVER_RESPONSE, SETTINGS_EMAIL_SERVER_RESPONSE, SETTINGS_CLEAR_ERROR_MSG} from '../actions/Settings';

export default function(state = null, action) {
  switch(action.type) {
    case SETTINGS_USERNAME_SERVER_RESPONSE:
    case SETTINGS_EMAIL_SERVER_RESPONSE:
    case SETTINGS_CLEAR_ERROR_MSG:
      return Object.assign({}, state, {
        usernameError: action.usernameError,
        emailError: action.emailError,
        passwordError: action.passwordError
      });
      break;
    default:
      return state;
  }
}
