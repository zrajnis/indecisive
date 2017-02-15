import {SIGNUP_SERVER_RESPONSE, SIGNUP_CLEAR_ERROR_MSG} from '../actions/Signup';

export default function(state = null, action) {
  switch(action.type) {
    case SIGNUP_SERVER_RESPONSE:
      return Object.assign({}, state, {
        error: action.error
      });
      break;
    case SIGNUP_CLEAR_ERROR_MSG:
      return Object.assign({}, state, {
        error: action.error
      });
      break;
    default:
      return state;
  }
}
