export const LOAD_DILEMMAS_SUCCESS = 'LOAD_DILEMMAS_SUCCESS';
export const LOAD_DILEMMAS_FAILURE = 'LOAD_DILEMMAS_FAILURE';
export const ADD_NEW_VOTE_SUCCESS = 'ADD_NEW_VOTE_SUCCESS';
export const ADD_NEW_VOTE_FAILURE = 'ADD_NEW_VOTE_FAILURE';
export const CHANGE_VOTE_SUCCESS = 'CHANGE_VOTE_SUCCESS';
export const CHANGE_VOTE_FAILURE = 'CHANGE_VOTE_FAILURE';
export const REMOVE_VOTE_SUCCESS = 'REMOVE_VOTE_SUCCESS';
export const REMOVE_VOTE_FAILURE = 'REMOVE_VOTE_FAILURE';
export const REMOVE_DILEMMA_ERROR = 'REMOVE_DILEMMA_ERROR';

export function loadDilemmas() {
  return (dispatch) => {
    fetch('/user/loadDilemmas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
      response.json().then((dilemmas) => {
        dispatch(loadDilemmasSuccess(dilemmas))
      });
    }).catch( (err) => {
      dispatch(loadDilemmasFailure(err));
    });
  }
}

function loadDilemmasSuccess(dilemmas) {
  return { type: LOAD_DILEMMAS_SUCCESS, dilemmas: dilemmas}
}

function loadDilemmasFailure(error) {
  return { type: LOAD_DILEMMAS_FAILURE, error: error}
}

export function addNewVote(answerIndex, dilemmaId) { //its a bit redundant since you can just make function "vote" and pass url depending whether its adding new one,removing existing or changing a vote
  return (dispatch) => {  //this approach is more thorough and logically makes more sense from aspect of someone who's reading the dilemma.jsx file
    fetch('/user/newVote', {
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
      response.json().then((changedDilemma) => {
        if (changedDilemma.result) {// result is "Dilemma not found"
          dispatch(addNewVoteFailure(changedDilemma.result, dilemmaId));
        }
        dispatch(addNewVoteSuccess(changedDilemma));
      });
    }).catch( (err) => {
      dispatch(addNewVoteFailure(err));
    });
  }
}

function addNewVoteSuccess(changedDilemma) {
  return {type: ADD_NEW_VOTE_SUCCESS, changedDilemma: changedDilemma}
}

function addNewVoteFailure(error, dilemmaId) {
  return {type: ADD_NEW_VOTE_FAILURE, error: error, dilemmaId: dilemmaId}
}

export function changeVote(oldAnswerIndex, newAnswerIndex, dilemmaId) {
  return (dispatch) => {
    fetch('/user/changeVote', {
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
      response.json().then((changedDilemma) => {
        if (changedDilemma.result) {// result is "Dilemma not found"
          dispatch(changeVoteFailure(changedDilemma.result, dilemmaId));
        }
        dispatch(changeVoteSuccess(changedDilemma));
      });
    }).catch( (err) => {
      dispatch(changeVoteFailure(err));
    });
  }
}

function changeVoteSuccess(changedDilemma) {
  return {type: CHANGE_VOTE_SUCCESS, changedDilemma: changedDilemma}
}

function changeVoteFailure(error, dilemmaId) {
  return {type: CHANGE_VOTE_FAILURE, error: error, dilemmaId: dilemmaId}
}

export function removeVote(answerIndex, dilemmaId) {
  return (dispatch) => {
    fetch('/user/removeVote', {
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
      response.json().then((changedDilemma) => {
        if (changedDilemma.result) {// result is "Dilemma not found"
         dispatch(removeVoteFailure(changedDilemma.result, dilemmaId));
        }
        dispatch(removeVoteSuccess(changedDilemma));
    }).catch((err) => {
      dispatch(removeVoteFailure(err));
    });
  })
  }
}

function removeVoteSuccess(changedDilemma) {
  return {type: REMOVE_VOTE_SUCCESS, changedDilemma: changedDilemma}
}

function removeVoteFailure(error, dilemmaId) {
  return {type: REMOVE_VOTE_FAILURE, error: error, dilemmaId: dilemmaId}
}

export function removeDilemmaError(dilemmaId) {
  return {type: REMOVE_DILEMMA_ERROR, error: '', dilemmaId: dilemmaId}
}