import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import gatewaysReducer from './reducers/gateways-reducer';

const combinedReducers = combineReducers({
  gateways: gatewaysReducer,
});

const storeEnhancers = composeWithDevTools(
    applyMiddleware(thunk),
);

export const store = createStore(
    combinedReducers,
    {
      gateways: [],
    },
    storeEnhancers,
);
