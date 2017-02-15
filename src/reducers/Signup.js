import {SERVER_RESPONSE} from '../actions/Signup';

export default function (state = null, action) {
  switch (action.type) {
    case SERVER_RESPONSE:
      return Object.assign({}, state, {
        response: action.response
      });
      break;
    default:
      return state;
  }
}
