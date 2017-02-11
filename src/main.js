import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './reducers/App';
import Container from './components/Container.jsx';

let store = createStore(App);

render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('app'));