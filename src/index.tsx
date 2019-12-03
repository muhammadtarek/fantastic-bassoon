import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
 html,
 body {
   margin: 0;
   padding: 0;
 }

 * {
   box-sizing: border-box;
 }

 *,
 h1,
 h2,
 h3,
 h4,
 h5,
 h6,
 label,
 span,
 p,
 input,
 textarea,
 select,
 option {
  font-family: 'Lato', sans-serif;
 }
`;

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
