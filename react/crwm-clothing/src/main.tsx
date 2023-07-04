import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import { Provider, useDispatch } from 'react-redux';

import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
