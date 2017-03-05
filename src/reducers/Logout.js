import {LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_CLEAR_ERROR_MSG } from '../actions/Logout';

export default function(state = null, action) {
  switch(action.type) {
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
    case LOGOUT_CLEAR_ERROR_MSG:
      return Object.assign({}, state, {
        error: action.error ? action.error : ''
      });
      break;
    default:
      return state;
  }
}
