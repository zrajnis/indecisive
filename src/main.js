import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './reducers/App';
import Container from './components/Container.jsx';

let store = createStore(App,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('app'));