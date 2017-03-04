import {LOAD_DATA_SUCCESS, LOAD_DATA_FAILURE, ADD_NEW_VOTE_SUCCESS, ADD_NEW_VOTE_FAILURE,
  CHANGE_VOTE_SUCCESS, CHANGE_VOTE_FAILURE,REMOVE_VOTE_SUCCESS, REMOVE_VOTE_FAILURE, REMOVE_DILEMMA_ERROR,
  SEARCH_DILEMMA_SUCCESS, SEARCH_DILEMMA_FAILURE}
  from '../actions/Dilemmas';

export default function(state = null, action) {
  switch(action.type) {
    case LOAD_DATA_SUCCESS:
    case SEARCH_DILEMMA_SUCCESS:
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
        votes: state.votes.map((vote, index) => {
          return action.changedDilemma._id === state.data[index]._id ? action.changedVote : vote; // vote and dilemma indexes co-relate ( vote on index 0 is in fact vote for dilemma on index 0)
        })
      });
      break;
    case CHANGE_VOTE_SUCCESS:
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
      return Object.assign({}, state, {
        data: state.data.map((dilemma) => {
          return dilemma._id === action.changedDilemma._id ? action.changedDilemma : dilemma;
        }),
        votes: state.votes.map((vote) => {
          if(vote.dilemmaId === action.changedDilemma._id) {
            return {voteIndex: -1}; //since each index of votes co-relates to each index in data we cant splice
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
    case SEARCH_DILEMMA_FAILURE:
      return Object.assign({}, state, {
        data: state.data.map((dilemma) => {
          if(dilemma._id === action.dilemmaId) {
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
