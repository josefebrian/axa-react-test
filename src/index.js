import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import history from 'store/history';

import { Loader } from 'components';
import App from 'containers/App';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {};
const store = configureAppStore(initialState, history);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Suspense fallback={<Loader fullscreen />}>
      <App />
    </Suspense>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
