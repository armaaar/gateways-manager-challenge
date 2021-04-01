import React from 'react';
import {Switch, Route} from 'react-router-dom';
import loadable from '@loadable/component';
import BasePage from './components/BasePage';
import PageLoading from './components/PageLoading';

const loadbleOptions = {fallback: <PageLoading />};
const GatewaysPage = loadable(() => import('./pages/Gateways'), loadbleOptions);
const GatewayPage = loadable(() => import('./pages/Gateways'), loadbleOptions);
const NotFoundPage = loadable(() => import('./pages/404'), loadbleOptions);

export default function RouteSwitcher() {
  return (
    <BasePage>
      <Switch>
        <Route exact path="/">
          <GatewaysPage />
        </Route>
        <Route path="/:gatewaySerialNumber">
          <GatewayPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BasePage>
  );
}

