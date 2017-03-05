export const SETTINGS_CHANGE_EMAIL_SUCCESS = 'SETTINGS_CHANGE_EMAIL_SUCCESS';
export const SETTINGS_CHANGE_PASSWORD_SUCCESS = 'SETTINGS_CHANGE_PASSWORD_SUCCESS';
export const SETTINGS_EMAIL_SERVER_RESPONSE = 'SETTINGS_EMAIL_SERVER_RESPONSE';
export const SETTINGS_CLEAR_ERROR_MSG = 'SETTINGS_CLEAR_ERROR_MSG';
export const SETTINGS_FAILED_EMAIL_VALIDATION = 'SETTINGS_FAILED_EMAIL_VALIDATION';
export const SETTINGS_FAILED_PASSWORD_VALIDATION = 'SETTINGS_FAILED_PASSWORD_VALIDATION';
export const SETTINGS_DEACTIVATE_ACCOUNT_SUCCESS = 'SETTINGS_DEACTIVATE_ACCOUNT_SUCCESS';
export const SETTINGS_DEACTIVATE_ACCOUNT_FAILURE = 'SETTINGS_DEACTIVATE_ACCOUNT_FAILURE';

export function changeEmail(newEmail) {
  return (dispatch) => {
    fetch('/user/settings/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: newEmail.value.trim()
      }),
      credentials: 'same-origin'
    }).then((response) => {
      response.json().then((data) => {
        switch(data.result) {
          case 'Success':
            newEmail.value = '';
            dispatch(changeEmailSuccess(data.result));
            setTimeout(() => {
              dispatch(clearErrorMsg());
            }, 1500);
            break;
          case 'Email is already in use':
            dispatch(serverEmailResponse(data.result));
            break;
          default:
            break;
        }
      });
    });
  };
}

function changeEmailSuccess(msg) {
  return {type: SETTINGS_CHANGE_EMAIL_SUCCESS, successEmailMsg: msg};
}

export function changePassword(newPassword) {
  return (dispatch) => {
    fetch('/user/settings/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: newPassword.value.trim()
      }),
      credentials: 'same-origin'
    }).then((response) => {
      response.json().then((data) => {
        if(data.result === 'Success') {
          newPassword.value = '';
          dispatch(changePasswordSuccess(data.result));
          setTimeout(() => {
            dispatch(clearErrorMsg());
          }, 1500);
        }
      });
    });
  };
}

function changePasswordSuccess(msg) {
  return {type: SETTINGS_CHANGE_PASSWORD_SUCCESS, successPasswordMsg: msg};
}

export function deactivateAccount() {
  return (dispatch) => {
    fetch('/user/settings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
      response.json().then((data) => {
        if(data.result === 'Success') {
          dispatch(deactivateAccountSuccess());
          window.location.href='http://localhost:3000';
        }
        else {
          dispatch(deactivateAccountFailure(data.result));
        }
      });

    });
  };
}

function deactivateAccountSuccess() {
  return {type: SETTINGS_DEACTIVATE_ACCOUNT_SUCCESS};
}

function deactivateAccountFailure(error) {
  return {type: SETTINGS_DEACTIVATE_ACCOUNT_FAILURE, deactivateError: error};
}

export function serverEmailResponse(response) {
  return {type: SETTINGS_EMAIL_SERVER_RESPONSE, emailError: response};
}

export function failedEmailValidation(response) {
  return {type: SETTINGS_FAILED_EMAIL_VALIDATION, emailError: response};
}

export function failedPasswordValidation(response) {
  return {type: SETTINGS_FAILED_PASSWORD_VALIDATION, passwordError: response};
}

export function clearErrorMsg() {
  return {type: SETTINGS_CLEAR_ERROR_MSG};
}
