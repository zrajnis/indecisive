import {SETTINGS_CHANGE_EMAIL_SUCCESS, SETTINGS_CHANGE_PASSWORD_SUCCESS,SETTINGS_CHANGE_EMAIL_FAILURE,
  SETTINGS_CLEAR_ERROR_MSG, SETTINGS_FAILED_EMAIL_VALIDATION, SETTINGS_FAILED_PASSWORD_VALIDATION,
  SETTINGS_DEACTIVATE_ACCOUNT_FAILURE, SETTINGS_CHANGE_PASSWORD_FAILURE} from '../actions/Settings';

export default function(state = null, action) {
  switch(action.type) {
    case SETTINGS_CHANGE_EMAIL_FAILURE:
    case SETTINGS_CHANGE_PASSWORD_FAILURE:
    case SETTINGS_FAILED_EMAIL_VALIDATION:
    case SETTINGS_FAILED_PASSWORD_VALIDATION:
    case SETTINGS_CLEAR_ERROR_MSG:
    case SETTINGS_DEACTIVATE_ACCOUNT_FAILURE:
    case SETTINGS_CHANGE_EMAIL_SUCCESS:
    case SETTINGS_CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        emailError: action.emailError ? action.emailError : '',
        passwordError: action.passwordError ? action.passwordError : '',
        deactivateError: action.deactivateError ? action.deactivateError : '',
        successEmailMsg: action.successEmailMsg ? action.successEmailMsg : '',
        successPasswordMsg: action.successPasswordMsg ? action.successPasswordMsg : ''
      });
      break;
    default:
      return state;
  }
}
