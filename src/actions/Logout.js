export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_CLEAR_ERROR_MSG = 'LOGOUT_CLEAR_ERROR_MSG';

export function logout() {
  return (dispatch) => {
    fetch('/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
      response.json().then((data) => {
        if(data.result === 'Success') {
          dispatch(logoutSuccess(data.result));
          window.location.href = 'http://localhost:3000';
        }
        else {
          dispatch(logoutFailure(data.result));
          setTimeout(() => {
            dispatch(clearErrorMsg());
          }, 1500);
        }
      });
    });
  };
}

function logoutSuccess() {
  return {type: LOGOUT_SUCCESS};
}

function logoutFailure(msg) {
  return {type: LOGOUT_FAILURE, error: msg};
}

function clearErrorMsg() {
  return {type: LOGOUT_CLEAR_ERROR_MSG};
}
