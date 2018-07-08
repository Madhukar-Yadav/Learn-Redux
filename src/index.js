import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux'; 

import './scss/index.scss';

import App from './MyApp';

const element = document.getElementById('content');

const render = () =>{
ReactDOM.render(
  
   <Provider store={store}>
    <App />
   </Provider> , element);
};

   store.subscribe(render);
   
   render();

document.body.classList.remove('loading');