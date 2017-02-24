import {LOAD_DATA_SUCCESS, LOAD_DATA_FAILURE, ADD_NEW_VOTE_SUCCESS, ADD_NEW_VOTE_FAILURE,
  CHANGE_VOTE_SUCCESS, CHANGE_VOTE_FAILURE,REMOVE_VOTE_SUCCESS, REMOVE_VOTE_FAILURE, REMOVE_DILEMMA_ERROR}
  from '../actions/Dilemmas';

export default function(state = null, action) {
  switch(action.type) {
    case LOAD_DATA_SUCCESS:
      return Object.assign({}, state, {
        data: action.dilemmas.map((dilemma, index) => {
          dilemma.voteIndex = action.userVoteIndexes[index];
          return dilemma;
        })
      });
      break;
    case ADD_NEW_VOTE_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.map((dilemma) => {
          if(dilemma._id === action.changedDilemma._id){
            dilemma = action.changedDilemma;
            dilemma.voteIndex = action.answerIndex;
          }
          return dilemma;
        })
      });
      break;
    case CHANGE_VOTE_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.map((dilemma) => {
          if(dilemma._id === action.changedDilemma._id){
            dilemma = action.changedDilemma;
            dilemma.voteIndex = action.newAnswerIndex;
          }
          return dilemma;
        })
      });
      break;
    case REMOVE_VOTE_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.map((dilemma) => {
          if(dilemma._id === action.changedDilemma._id){
            dilemma = action.changedDilemma;
            dilemma.voteIndex = - 1;
          }
          return dilemma;
        })
      });
      break;
    case LOAD_DATA_FAILURE:
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