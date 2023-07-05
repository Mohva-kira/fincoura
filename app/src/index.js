import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './app/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import './i18next'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
       
      />
    
    
      <App />
    </BrowserRouter>
  </Provider>





);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
