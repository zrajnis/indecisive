import {LOAD_DILEMMAS_SUCCESS, LOAD_DILEMMAS_FAILURE, ADD_NEW_VOTE_SUCCESS, ADD_NEW_VOTE_FAILURE,
  CHANGE_VOTE_SUCCESS, CHANGE_VOTE_FAILURE,REMOVE_VOTE_SUCCESS, REMOVE_VOTE_FAILURE, REMOVE_DILEMMA_ERROR}
  from '../actions/Dilemmas';

export default function(state = null, action) {
  switch(action.type) {
    case LOAD_DILEMMAS_SUCCESS:
      return Object.assign({}, state, {
        data: action.dilemmas
      });
      break;
    case ADD_NEW_VOTE_SUCCESS:
    case CHANGE_VOTE_SUCCESS:
    case REMOVE_VOTE_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.map((dilemma) => {
          if(dilemma._id === action.changedDilemma._id){
            dilemma = action.changedDilemma;
          }
          return dilemma;
        })
      });
      break;
    case LOAD_DILEMMAS_FAILURE:
    case ADD_NEW_VOTE_FAILURE:
    case CHANGE_VOTE_FAILURE:
    case REMOVE_VOTE_FAILURE:
    case REMOVE_DILEMMA_ERROR:
      return Object.assign({}, state, {
        data: state.data.map((dilemma) => {
          if(dilemma._id === action.dilemmaId){
            dilemma.error = action.error;
          }
          return dilemma;
        })
      });
      break;
    default:
      return state;
  }
}