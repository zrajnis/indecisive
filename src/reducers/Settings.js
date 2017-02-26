import {SETTINGS_EMAIL_SERVER_RESPONSE, SETTINGS_CLEAR_ERROR_MSG,
  SETTINGS_FAILED_EMAIL_VALIDATION, SETTINGS_FAILED_PASSWORD_VALIDATION, SETTINGS_DEACTIVATE_ACCOUNT_FAILURE
  } from '../actions/Settings';

export default function(state = null, action) {
  switch(action.type) {
    case SETTINGS_EMAIL_SERVER_RESPONSE:
    case SETTINGS_FAILED_EMAIL_VALIDATION:
    case SETTINGS_FAILED_PASSWORD_VALIDATION:
    case SETTINGS_CLEAR_ERROR_MSG:
    case SETTINGS_DEACTIVATE_ACCOUNT_FAILURE:
      return Object.assign({}, state, {
        emailError: action.emailError ? action.emailError : '',
        passwordError: action.passwordError ? action.passwordError : '',
        deactivateError: action.deactivateError ? action.deactivateError : ''
      });
      break;
    default:
      return state;
  }
}
