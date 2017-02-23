export const SETTINGS_EMAIL_SERVER_RESPONSE = 'SETTINGS_EMAIL_SERVER_RESPONSE';
export const SETTINGS_CLEAR_ERROR_MSG = 'SETTINGS_CLEAR_ERROR_MSG';
export const SETTINGS_FAILED_EMAIL_VALIDATION = 'SETTINGS_FAILED_EMAIL_VALIDATION';
export const SETTINGS_FAILED_PASSWORD_VALIDATION = 'SETTINGS_FAILED_PASSWORD_VALIDATION';

export function serverEmailResponse(response) {
  return {type: SETTINGS_EMAIL_SERVER_RESPONSE, emailError: response, passwordError: ''};
}

export function failedEmailValidation(response){
  return {type: SETTINGS_FAILED_EMAIL_VALIDATION, emailError: response, passwordError: ''};
}

export function failedPasswordValidation(response){
  return {type: SETTINGS_FAILED_PASSWORD_VALIDATION, emailError: '', passwordError: response};
}

export function clearErrorMsg() {
  return {type: SETTINGS_CLEAR_ERROR_MSG, emailError: '', passwordError: ''};
}
