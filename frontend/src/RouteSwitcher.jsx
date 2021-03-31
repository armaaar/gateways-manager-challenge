import React from 'react';
import {Switch, Route} from 'react-router-dom';
import loadable from '@loadable/component';
import PageLoading from './components/PageLoading';

const loadbleOptions = {fallback: <PageLoading />};
const Home = loadable(() => import('./pages/Home'), loadbleOptions);
const NotFound = loadable(() => import('./pages/404'), loadbleOptions);

export default function RouteSwitcher() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

