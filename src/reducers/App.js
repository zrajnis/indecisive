import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Signup from './Signup';
import Login from './Login';

const App = combineReducers({
  Signup,
  Login,
  form: formReducer
});

export default App
