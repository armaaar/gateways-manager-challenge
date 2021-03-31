import React from 'react';
import BasePage from '../components/BasePage';

import useApi from '../hooks/use-api';
import connectWithRouter from '../utils/connect-with-router';
import createAutoSelector from '../utils/auto-selector';
import {fetchGateways} from '../actions/gateways-actions';

function Home({gateways, fetchGateways}) {
  useApi(gateways, fetchGateways);
  return (
    <BasePage>
      <h2>Test Page</h2>
    </BasePage>
  );
}


const mapStateToProps = createAutoSelector(
    (state) => state.gateways,
    (gateways) => ({gateways}),
);

const mapActionsToProps = {
  fetchGateways,
};


export default connectWithRouter(
    Home,
    mapStateToProps,
    mapActionsToProps,
);
