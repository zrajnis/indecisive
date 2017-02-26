import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Signup from './Signup';
import Login from './Login';
import Settings from './Settings';
import CreateDilemma from './CreateDilemma';
import Dilemmas from './Dilemmas';

const App = combineReducers({
  Signup,
  Login,
  Settings,
  CreateDilemma,
  Dilemmas,
  form: formReducer
});

export default App;
