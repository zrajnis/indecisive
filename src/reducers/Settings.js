import {SETTINGS_EMAIL_SERVER_RESPONSE, SETTINGS_CLEAR_ERROR_MSG,
  SETTINGS_FAILED_EMAIL_VALIDATION, SETTINGS_FAILED_PASSWORD_VALIDATION
  } from '../actions/Settings';

export default function(state = null, action) {
  switch(action.type) {
    case SETTINGS_EMAIL_SERVER_RESPONSE:
    case SETTINGS_FAILED_EMAIL_VALIDATION:
    case SETTINGS_FAILED_PASSWORD_VALIDATION:
    case SETTINGS_CLEAR_ERROR_MSG:
      return Object.assign({}, state, {
        emailError: action.emailError,
        passwordError: action.passwordError
      });
      break;
    default:
      return state;
  }
}
