import {LOAD_DATA_SUCCESS, LOAD_DATA_FAILURE, ADD_NEW_VOTE_SUCCESS, ADD_NEW_VOTE_FAILURE,
  CHANGE_VOTE_SUCCESS, CHANGE_VOTE_FAILURE,REMOVE_VOTE_SUCCESS, REMOVE_VOTE_FAILURE, REMOVE_DILEMMA_ERROR}
  from '../actions/Dilemmas';

export default function(state = null, action) {
  switch(action.type) {
    case LOAD_DATA_SUCCESS:
      return Object.assign({}, state, {
        data: action.dilemmas,
        votes: action.votes
      });
      break;
    case ADD_NEW_VOTE_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.map((dilemma) => {
          return dilemma._id === action.changedDilemma._id ? action.changedDilemma : dilemma;
        }),
        votes: action.votes
      });
      break;
    case CHANGE_VOTE_SUCCESS:
      console.log('entered change vote' + action.changedVote)
      return Object.assign({}, state, {
        data: state.data.map((dilemma) => {
          return dilemma._id === action.changedDilemma._id ? action.changedDilemma : dilemma;
        }),
        votes: state.votes.map((vote) => {
          return vote.dilemmaId === action.changedDilemma._id ? action.changedVote : vote;
        })
      });
      break;
    case REMOVE_VOTE_SUCCESS:
      console.log('entered remove vote')
      return Object.assign({}, state, {
        data: state.data.map((dilemma) => {
          return dilemma._id === action.changedDilemma._id ? action.changedDilemma : dilemma;
        }),
        votes: state.votes.map((vote, index) => {
          if(vote.dilemmaId === action.changedDilemma._id){
            console.log('aaaaaaaaaa ' + vote)
            state.votes.splice(index, 1);
          }
          else {
            return vote;
          }
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