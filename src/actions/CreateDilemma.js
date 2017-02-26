export const CREATE_DILEMMA_SUCCESS = 'CREATE_DILEMMA_SUCCESS';
export const CREATE_DILEMMA_FAILURE = 'CREATE_DILEMMA_FAILURE';
export const CLEAR_DILEMMA_MESSAGES = 'CLEAR_DILEMMA_MESSAGES';
export const RESET_ANSWERS_ARRAY = 'RESET_ANSWERS_ARRAY';

export function resetAnswersArray() {
  return {type: RESET_ANSWERS_ARRAY, answersArray: []};
}

export function createDilemmaSuccess(message) {
  return {type: CREATE_DILEMMA_SUCCESS, message: message};
}

export function createDilemmaFailure(message) {
  return {type: CREATE_DILEMMA_FAILURE, message: message};
}

export function clearDilemmaMessages() {
  return {type: CLEAR_DILEMMA_MESSAGES, message: ''};
}
