import {SETTINGS_USERNAME_SERVER_RESPONSE, SETTINGS_EMAIL_SERVER_RESPONSE, SETTINGS_PASSWORD_SERVER_RESPONSE,
  SETTINGS_CLEAR_ERROR_MSG, SETTINGS_FAILED_USERNAME_VALIDATION, SETTINGS_FAILED_EMAIL_VALIDATION,
  SETTINGS_FAILED_PASSWORD_VALIDATION} from '../actions/Settings';

export default function(state = null, action) {
  switch(action.type) {
    case SETTINGS_USERNAME_SERVER_RESPONSE:
    case SETTINGS_EMAIL_SERVER_RESPONSE:
    case SETTINGS_PASSWORD_SERVER_RESPONSE:
    case SETTINGS_FAILED_USERNAME_VALIDATION:
    case SETTINGS_FAILED_EMAIL_VALIDATION:
    case SETTINGS_FAILED_PASSWORD_VALIDATION:
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
