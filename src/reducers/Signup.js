export default function (state = null, action) {
  switch (action.type) {
    case 'SIGNUP_ATTEMPT':
      return action.payload;
      break;
  }
  return state;
}
