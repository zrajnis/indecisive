import {CREATE_DILEMMA_SUCCESS, CREATE_DILEMMA_FAILURE, RESET_ANSWERS_ARRAY} from '../actions/CreateDilemma';

export default function(state = null, action) {
  switch(action.type) {
    case CREATE_DILEMMA_SUCCESS:
    case CREATE_DILEMMA_FAILURE:
    //case LOGIN_CLEAR_ERROR_MSG:
      return Object.assign({}, state, {
        error: action.error
      });
      break;
    case RESET_ANSWERS_ARRAY:
      return Object.assign({}, state, {
        answersArray: action.answersArray
      });
    default:
      return state;
  }
}