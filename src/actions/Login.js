export const LOGIN_SERVER_RESPONSE = 'LOGIN_SERVER_RESPONSE';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_CLEAR_ERROR_MSG = 'LOGIN_CLEAR_ERROR_MSG';

export function serverResponse(response) {
  return {type: LOGIN_SERVER_RESPONSE, error: response};
}

export function loginFailure() {
  return {type: LOGIN_FAILURE, error: 'Login failed'};
}

export function clearErrorMsg() {
  return {type: LOGIN_CLEAR_ERROR_MSG, error: ''};
}
