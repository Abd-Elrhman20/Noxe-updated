import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// css
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
// js
// import "@fortawesome/fontawesome-free/js/all.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import $ from "jquery";
// routing
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Provider } from 'react-redux';
import { store } from './Redux/store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode></React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
