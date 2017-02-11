import { combineReducers } from 'redux'
import Signup from './Signup';
import Login from './Login';


const App = combineReducers({
  Signup,
  Login
});

export default App
