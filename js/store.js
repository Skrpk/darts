/**
 * Created by user on 20.02.2017.
 */
import reducer from './reducers/reducer';
import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';

const middleware = applyMiddleware(logger());

export default createStore(reducer, middleware);
