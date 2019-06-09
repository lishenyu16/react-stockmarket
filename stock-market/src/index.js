import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom'
import axios from 'axios'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reduxSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import authReducer from './store/reducers/auth'
import stocksReducer from './store/reducers/stocks'
import portfolioReducer from './store/reducers/portfolio'
import marketReducer from './store/reducers/market'
import profileReducer from './store/reducers/profile'
import { watchAuth,watchStocks,watchMarket,watchPortfolio } from './store/saga/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    stocks: stocksReducer,
    auth: authReducer,
    market:marketReducer,
    portfolio:portfolioReducer,
    profile: profileReducer
})
const sagaMiddleware = reduxSagaMiddleware()
export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk,sagaMiddleware)
));

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchStocks)
sagaMiddleware.run(watchMarket)
sagaMiddleware.run(watchPortfolio)

axios.defaults.baseURL= 'https://api.iextrading.com/1.0' //https://storage.googleapis.com/iex/api/logos/AAPL.png
ReactDOM.render(<Provider store={store}><HashRouter><App /></HashRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
