import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/browser';

import App from './App';
import { store } from './store'

import * as serviceWorker from './serviceWorker';


Sentry.init({ dsn: "https://abf54ce42681460cbea61d773becd43d@o374574.ingest.sentry.io/5192792" })

const AppWrapper = () => (
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <AppWrapper />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
