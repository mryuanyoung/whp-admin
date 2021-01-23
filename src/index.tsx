import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Scrollbars } from 'react-custom-scrollbars';
// import ErrorBoundary from './components/ErrorBoundary/index';

ReactDOM.render(
  // <React.StrictMode>
  // {/* <ErrorBoundary> */}
  <Scrollbars>
    <App />
  </Scrollbars>
  // {/* </ErrorBoundary> */}
  // </React.StrictMode>
  , document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
