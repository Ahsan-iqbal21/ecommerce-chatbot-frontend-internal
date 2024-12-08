import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';

const middlewares = [thunk];

middlewares.push(logger);

const store = configureStore(
  {reducer: rootReducer},
  compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);

export default store