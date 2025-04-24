import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import '@/theme.css'
import 'animate.css';
import '@icon-park/react/styles/index.css'
// import App from './App';
import { RouterProvider } from 'react-router-dom';
import route from '@/router/index'
import { Provider } from 'react-redux';
import store from '@/store/index'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={route} >
    </RouterProvider >
  </Provider>
);

