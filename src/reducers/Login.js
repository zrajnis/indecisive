import {LOGIN_SERVER_RESPONSE, LOGIN_FAILURE, LOGIN_CLEAR_ERROR_MSG} from '../actions/Login';

export default function(state = null, action) {
  switch(action.type) {
    case LOGIN_SERVER_RESPONSE:
      return Object.assign({}, state, {
        error: action.error
      });
      break;
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });
      break;
    case LOGIN_CLEAR_ERROR_MSG:
      return Object.assign({}, state, {
        error: action.error
      });
      break;
    default:
      return state;
  }
}