export const SIGNUP_SERVER_RESPONSE = 'SIGNUP_SERVER_RESPONSE';
export const SIGNUP_CLEAR_ERROR_MSG = 'SIGNUP_CLEAR_ERROR_MSG';

export function serverResponse(response) {
  return {type: SIGNUP_SERVER_RESPONSE, error: response};
}

export function clearErrorMsg() {
  return {type: SIGNUP_CLEAR_ERROR_MSG, error: ''};
}
