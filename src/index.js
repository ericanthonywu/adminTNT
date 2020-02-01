import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-toastify/dist/ReactToastify.css';
import "./assets/scss/_custom-styles.scss"

import {BrowserRouter} from "react-router-dom";

import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import reduxthunk from 'redux-thunk'
import reducer from './redux/reducers'

const store = createStore(reducer, {}, applyMiddleware(reduxthunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
