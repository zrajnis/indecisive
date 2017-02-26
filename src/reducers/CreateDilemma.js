import {CREATE_DILEMMA_SUCCESS, CREATE_DILEMMA_FAILURE, RESET_ANSWERS_ARRAY, CLEAR_DILEMMA_MESSAGES} 
  from '../actions/CreateDilemma';

export default function(state = null, action) {
  switch(action.type) {
    case CREATE_DILEMMA_SUCCESS:
      return Object.assign({}, state, {
        successMsg: action.message
      });
      break;
    case CREATE_DILEMMA_FAILURE:
      return Object.assign({}, state, {
        errorMsg: action.message
      });
      break;
    case CLEAR_DILEMMA_MESSAGES:
      return Object.assign({}, state, {
        successMsg: action.message,
        errorMsg: action.message
      });
      break;
    case RESET_ANSWERS_ARRAY:
      return Object.assign({}, state, {
        answersArray: action.answersArray
      });
      break;
    default:
      return state;
  }
}
