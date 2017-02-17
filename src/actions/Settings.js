export const SETTINGS_USERNAME_SERVER_RESPONSE = 'SETTINGS_USERNAME_SERVER_RESPONSE';
export const SETTINGS_EMAIL_SERVER_RESPONSE = 'SETTINGS_EMAIL_SERVER_RESPONSE';
export const SETTINGS_PASSWORD_SERVER_RESPONSE = 'SETTINGS_PASSWORD_SERVER_RESPONSE';
export const SETTINGS_CLEAR_ERROR_MSG = 'SETTINGS_CLEAR_ERROR_MSG';
export const SETTINGS_FAILED_USERNAME_VALIDATION = 'SETTINGS_FAILED_USERNAME_VALIDATION';
export const SETTINGS_FAILED_EMAIL_VALIDATION = 'SETTINGS_FAILED_EMAIL_VALIDATION';
export const SETTINGS_FAILED_PASSWORD_VALIDATION = 'SETTINGS_FAILED_PASSWORD_VALIDATION';

export function serverUsernameResponse(response) {
  return {type: SETTINGS_USERNAME_SERVER_RESPONSE, usernameError: response, emailError: '', passwordError: ''};
}

export function serverEmailResponse(response) {
  return {type: SETTINGS_EMAIL_SERVER_RESPONSE, usernameError: '', emailError: response, passwordError: ''};
}

export function serverPasswordResponse(response) {
  return {type: SETTINGS_PASSWORD_SERVER_RESPONSE, usernameError: '', emailError: '', passwordError: response};
}

export function failedUsernameValidation(response){
  return {type: SETTINGS_FAILED_USERNAME_VALIDATION, usernameError: response, emailError: '', passwordError: ''};
}

export function failedEmailValidation(response){
  return {type: SETTINGS_FAILED_EMAIL_VALIDATION, usernameError: '', emailError: response, passwordError: ''};
}

export function failedPasswordValidation(response){
  return {type: SETTINGS_FAILED_PASSWORD_VALIDATION, usernameError: '', emailError: '', passwordError: response};
}

export function clearErrorMsg() {
  return {type: SETTINGS_CLEAR_ERROR_MSG, usernameError: '', emailError: '', passwordError: ''};
}
