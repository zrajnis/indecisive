export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';
export const ADD_NEW_VOTE_SUCCESS = 'ADD_NEW_VOTE_SUCCESS';
export const ADD_NEW_VOTE_FAILURE = 'ADD_NEW_VOTE_FAILURE';
export const CHANGE_VOTE_SUCCESS = 'CHANGE_VOTE_SUCCESS';
export const CHANGE_VOTE_FAILURE = 'CHANGE_VOTE_FAILURE';
export const REMOVE_VOTE_SUCCESS = 'REMOVE_VOTE_SUCCESS';
export const REMOVE_VOTE_FAILURE = 'REMOVE_VOTE_FAILURE';
export const REMOVE_DILEMMA_ERROR = 'REMOVE_DILEMMA_ERROR';
export const SEARCH_DILEMMA_SUCCESS = 'SEARCH_DILEMMA_SUCCESS';
export const SEARCH_DILEMMA_FAILURE = 'SEARCH_DILEMMA_FAILURE';

export function loadDilemmas(tabName) {
  return (dispatch) => {
    fetch('/dilemma/load/' + tabName, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
      response.json().then((data) => {
        dispatch(loadDataSuccess(data));
      });
    }).catch( (err) => {
      dispatch(loadDilemmasFailure(err));
    });
  };
}

function loadDataSuccess(data) {
  return {type: LOAD_DATA_SUCCESS, dilemmas: data.dilemmas, votes: data.votes};
}

function loadDilemmasFailure(error) {
  return {type: LOAD_DATA_FAILURE, error: error};
}

export function addNewVote(answerIndex, dilemmaId) { //its a bit redundant since you can just make function "vote" and pass url depending whether its adding new one,removing existing or changing a vote
  return (dispatch) => {  //this approach is more thorough and logically makes more sense from aspect of someone who's reading the dilemma.jsx file
    fetch('/vote/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answerIndex: answerIndex,
        dilemmaId: dilemmaId
      }),
      credentials: 'same-origin'
    }).then((response) => {
      response.json().then((data) => {
        if (data.result) {// result is "Dilemma not found"
          dispatch(addNewVoteFailure(data.result, dilemmaId));
        }
        dispatch(addNewVoteSuccess(data.dilemma, data.vote));
      });
    }).catch( (err) => {
      dispatch(addNewVoteFailure(err));
    });
  };
}

function addNewVoteSuccess(changedDilemma, changedVote) {
  return {type: ADD_NEW_VOTE_SUCCESS, changedDilemma: changedDilemma, changedVote: changedVote};
}

function addNewVoteFailure(error, dilemmaId) {
  return {type: ADD_NEW_VOTE_FAILURE, error: error, dilemmaId: dilemmaId};
}

export function changeVote(oldAnswerIndex, newAnswerIndex, dilemmaId) {
  return (dispatch) => {
    fetch('/vote/change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldAnswerIndex: oldAnswerIndex,
        newAnswerIndex: newAnswerIndex,
        dilemmaId: dilemmaId
      }),
      credentials: 'same-origin'
    }).then((response) => {
      response.json().then((data) => {
        if (data.result) {// result is "Dilemma not found"
          dispatch(changeVoteFailure(data.result, dilemmaId));
        }
        dispatch(changeVoteSuccess(data.dilemma, data.vote));
      });
    }).catch( (err) => {
      dispatch(changeVoteFailure(err));
    });
  };
}

function changeVoteSuccess(changedDilemma, changedVote) {
  return {type: CHANGE_VOTE_SUCCESS, changedDilemma: changedDilemma, changedVote: changedVote};
}

function changeVoteFailure(error, dilemmaId) {
  return {type: CHANGE_VOTE_FAILURE, error: error, dilemmaId: dilemmaId};
}

export function removeVote(answerIndex, dilemmaId) {
  return (dispatch) => {
    fetch('/vote/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answerIndex: answerIndex,
        dilemmaId: dilemmaId
      }),
      credentials: 'same-origin'
    }).then((response) => {
      response.json().then((data) => {
        if (data.result) {// result is "Dilemma not found"
          dispatch(removeVoteFailure(data.result, dilemmaId));
        }
        dispatch(removeVoteSuccess(data.dilemma));
      }).catch((err) => {
        dispatch(removeVoteFailure(err));
      });
    });
  };
}

function removeVoteSuccess(changedDilemma) {
  return {type: REMOVE_VOTE_SUCCESS, changedDilemma: changedDilemma};
}

function removeVoteFailure(error, dilemmaId) {
  return {type: REMOVE_VOTE_FAILURE, error: error, dilemmaId: dilemmaId};
}

export function removeDilemmaError(dilemmaId) {
  return {type: REMOVE_DILEMMA_ERROR, error: '', dilemmaId: dilemmaId};
}

export function searchDilemma() {
  const title = document.getElementById('searchBar');
  return (dispatch) => {
    fetch('/dilemma/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.value
      }),
      credentials: 'same-origin'
    }).then((response) => {
      title.value = '';
      response.json().then((data) => {
        if(data.result) { // result is "Dilemma not found"
          dispatch(searchDilemmaFailure(data.result));
        }
        dispatch(searchDilemmaSuccess(data));
      });
    }).catch( (err) => {
      dispatch(searchDilemmaFailure(err));
    });
  };
}

function searchDilemmaSuccess(data) {
  return {type: SEARCH_DILEMMA_SUCCESS, dilemmas: data.dilemmas, votes: data.votes};
}

function searchDilemmaFailure(error) {
  return {type: SEARCH_DILEMMA_FAILURE, error: error};
}
