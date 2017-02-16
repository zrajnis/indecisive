export const SETTINGS_SERVER_RESPONSE = 'SETTINGS_SERVER_RESPONSE';
export const SETTINGS_CLEAR_ERROR_MSG = 'SETTINGS_CLEAR_ERROR_MSG';

export function serverResponse(response) {
  return {type: SETTINGS_SERVER_RESPONSE, error: response};
}

export function clearErrorMsg() {
  return {type: SETTINGS_CLEAR_ERROR_MSG, error: ''};
}
