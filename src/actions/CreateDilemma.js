export const CREATE_DILEMMA_SUCCESS = 'CREATE_DILEMMA_SUCCESS';
export const CREATE_DILEMMA_FAILURE = 'CREATE_DILEMMA_FAILURE';
export const RESET_ANSWERS_ARRAY = 'RESET_ANSWERS_ARRAY';

export function resetAnswersArray(){
  return {type: RESET_ANSWERS_ARRAY, answersArray: []}
}