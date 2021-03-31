import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import {store} from './store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './utils/scroll-to-top';

import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';

import RouteSwitcher from './RouteSwitcher';

import './styles.sass';

library.add(fas);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <RouteSwitcher />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
