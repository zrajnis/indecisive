import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
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
        <IndexRoute component={Guest} />
        <Route path="hot" component={Guest}/>
        <Route path="newest" component={Guest}/>
      </Route>
      <Route path="/user" >
        <IndexRoute component={User} />
        <Route path="hot" component={User}/>
        <Route path="newest" component={User}/>
        <Route path="mine" component={User}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));