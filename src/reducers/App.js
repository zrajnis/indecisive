import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Signup from './Signup';
import Login from './Login';
import Settings from './Settings';

const App = combineReducers({
  Signup,
  Login,
  Settings,
  form: formReducer
});

export default App
