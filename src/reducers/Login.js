export default function (state = null, action) {
  switch (action.type) {
    case 'LOGIN_ATTEMPT':
      return action.payload;
      break;
  }
  return state;
}
