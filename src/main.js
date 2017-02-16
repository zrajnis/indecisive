import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {Router, Route, browserHistory} from 'react-router';
import thunk from 'redux-thunk';
import App from './reducers/App';
import Guest from './components/guest/Guest.jsx';
import User from './components/user/User.jsx';

let store = createStore(App,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Guest}>
        <Route path="test" component={User}/>
        <Route path="test2" component={Guest}/>
      </Route>
      <Route path="/user" component={User}>
        <Route path="test" component={User}/>
        <Route path="test2" component={Guest}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));