export const LOAD_DILEMMAS_SUCCESS = 'LOAD_DILEMMAS_SUCCESS';
export const LOAD_DILEMMAS_FAILURE = 'LOAD_DILEMMAS_FAILURE';
export const ADD_NEW_VOTE_SUCCESS = 'ADD_NEW_VOTE_SUCCESS';
export const ADD_NEW_VOTE_FAILURE = 'ADD_NEW_VOTE_FAILURE';
export const CHANGE_VOTE_SUCCESS = 'CHANGE_VOTE_SUCCESS';
export const CHANGE_VOTE_FAILURE = 'CHANGE_VOTE_FAILURE';
export const REMOVE_VOTE_SUCCESS = 'REMOVE_VOTE_SUCCESS';
export const REMOVE_VOTE_FAILURE = 'REMOVE_VOTE_FAILURE';

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
  console.log('entered add new action');         //this approach is more thorough and logically makes more sense from aspect of someone who's reading the dilemma.jsx file
  return (dispatch) => {
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
      console.log('entered add new callback');
      response.json().then((changedDilemma) => {
        console.log('added successfully');
        dispatch(addNewVoteSuccess(changedDilemma));
      });
    }).catch( (err) => {
      dispatch(addNewVoteFailure(err));
    });
  }
}

function addNewVoteSuccess(changedDilemma) {
  console.log('entered add new vote success');
  return {type: ADD_NEW_VOTE_SUCCESS, changedDilemma: changedDilemma}
}

function addNewVoteFailure(error, changedDilemma) {
  return {type: ADD_NEW_VOTE_FAILURE, error: error, dilemmaId: changedDilemma._id}
}

export function changeVote(oldAnswerIndex, newAnswerIndex, dilemmaId) {
  console.log('entered change action');
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
      console.log('entered change callback');
      response.json().then((changedDilemma) => {
        console.log('changed successfully');
        dispatch(changeVoteSuccess(changedDilemma));
      });
    }).catch( (err) => {
      dispatch(changeVoteFailure(err));
    });
  }
}

function changeVoteSuccess(changedDilemma) {
  console.log('entered change vote success');
  return {type: CHANGE_VOTE_SUCCESS, changedDilemma: changedDilemma}
}

function changeVoteFailure(error, changedDilemma) {
  return {type: CHANGE_VOTE_FAILURE, error: error, dilemmaId: changedDilemma._id}
}

export function removeVote(answerIndex, dilemmaId) {
  console.log('entered remove action');
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
      console.log('entered remove callback');
      response.json().then((changedDilemma) => {
        console.log('removed successfully');
        dispatch(removeVoteSuccess(changedDilemma));
      });
    }).catch( (err) => {
      dispatch(removeVoteFailure(err));
    });
  }
}

function removeVoteSuccess(changedDilemma) {
  console.log('entered remove vote success');
  return {type: REMOVE_VOTE_SUCCESS, changedDilemma: changedDilemma}
}

function removeVoteFailure(error, changedDilemma) {
  return {type: REMOVE_VOTE_FAILURE, error: error, dilemmaId: changedDilemma._id}
}