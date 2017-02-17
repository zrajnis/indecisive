export const SETTINGS_USERNAME_SERVER_RESPONSE = 'SETTINGS_USERNAME_SERVER_RESPONSE';
export const SETTINGS_EMAIL_SERVER_RESPONSE = 'SETTINGS_EMAIL_SERVER_RESPONSE';
export const SETTINGS_CLEAR_ERROR_MSG = 'SETTINGS_CLEAR_ERROR_MSG';

export function serverUsernameResponse(response) {
  return {type: SETTINGS_USERNAME_SERVER_RESPONSE, usernameError: response, emailError: '', passwordError: ''};
}

export function serverEmailResponse(response) {
  return {type: SETTINGS_EMAIL_SERVER_RESPONSE, usernameError: '', emailError: response, passwordError: ''};
}

export function clearErrorMsg() {
  return {type: SETTINGS_CLEAR_ERROR_MSG, usernameError: '', emailError: '', passwordError: ''};
}
