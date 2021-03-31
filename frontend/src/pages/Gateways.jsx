import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../components/Loader';
import DataList from '../components/DataList';

import useApi from '../hooks/use-api';
import connectWithRouter from '../utils/connect-with-router';
import createAutoSelector from '../utils/auto-selector';
import {fetchGateways} from '../actions/gateways-actions';

function GatewaysPage({gateways, fetchGateways}) {
  const isReady = useApi(gateways, fetchGateways);

  const gatewaysList = gateways.map((gateway) => ({
    id: gateway.serialNumber,
    name: gateway.readableName || gateway.serialNumber || gateway.ipv4,
    info: [
      {
        key: 'serialNumber',
        name: 'Serial Number',
        value: gateway.serialNumber,
      },
      {
        key: 'readableName',
        name: 'Readable Name',
        value: gateway.readableName,
      },
      {
        key: 'IPv4',
        name: 'Serial Number',
        value: gateway.ipv4,
      },
      {
        key: 'peripheralsCount',
        name: '# of Peripherals',
        value: String(gateway.peripherals.length),
      },
    ],
  }));
  return (
    <section>
      <h2>Gateways</h2>
      {!isReady ? (
        <Loader />
      ) : (
        <DataList items={gatewaysList} />
      )}
    </section>
  );
}

GatewaysPage.propTypes = {
  gateways: PropTypes.arrayOf(
      PropTypes.shape({
        serialNumber: PropTypes.string.isRequired,
        readableName: PropTypes.string.isRequired,
        ipv4: PropTypes.string.ipv4,
        peripherals: PropTypes.array,
      }),
  ),
  fetchGateways: PropTypes.func.isRequired,
};

GatewaysPage.defaultProps = {
  gateways: [],
};

const mapStateToProps = createAutoSelector(
    (state) => state.gateways,
    (gateways) => ({gateways}),
);

const mapActionsToProps = {
  fetchGateways,
};

export default connectWithRouter(
    GatewaysPage,
    mapStateToProps,
    mapActionsToProps,
);
