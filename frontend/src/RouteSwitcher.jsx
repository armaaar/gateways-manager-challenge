import React from 'react';
import {Switch, Route} from 'react-router-dom';
import loadable from '@loadable/component';
import {Helmet} from 'react-helmet';
import BasePage from './components/BasePage';
import PageLoading from './components/PageLoading';
import {DEFAULT_TITLE} from './utils/constants';

const loadbleOptions = {fallback: <PageLoading />};
const Home = loadable(() => import('./pages/Home'), loadbleOptions);

export default function RouteSwitcher() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <BasePage title="Page can't be found!">
          <Helmet>
            <title>404 Not Found - {DEFAULT_TITLE}</title>
          </Helmet>
        </BasePage>
      </Route>
    </Switch>
  );
}

