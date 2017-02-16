import {SETTINGS_SERVER_RESPONSE, SETTINGS_CLEAR_ERROR_MSG} from '../actions/Settings';

export default function(state = null, action) {
  switch(action.type) {
    case SETTINGS_SERVER_RESPONSE:
      return Object.assign({}, state, {
        error: action.error
      });
      break;
    case SETTINGS_CLEAR_ERROR_MSG:
      return Object.assign({}, state, {
        error: action.error
      });
      break;
    default:
      return state;
  }
}
