import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Loader from '../components/Loader';
import DataList from '../components/DataList';
import Modal from '../components/Modal';
import FormCreator from '../components/FormCreator';
import TitleWithButton from '../components/TitleWithButton';

import useApi from '../hooks/use-api';
import connectWithRouter from '../utils/connect-with-router';
import createAutoSelector from '../utils/auto-selector';
import GATEWAY_FORM_FIELDS from '../formFields/gatewayFormFields';
import {
  fetchGateways,
  createGateway,
  updateGateway,
  deleteGateway,
} from '../actions/gateways-actions';

function GatewaysPage({
  gateways,
  fetchGateways,
  createGateway,
  updateGateway,
  deleteGateway,
}) {
  const isReady = useApi(gateways, fetchGateways);
  const [isAddGatewayFormShown, setIsAddGatewayFormShown] = useState(false);

  function showModal() {
    setIsAddGatewayFormShown(true);
  }

  function closeModal() {
    setIsAddGatewayFormShown(false);
  }

  function onCreateGateway(_, values) {
    return createGateway(values);
  }

  function onUpdateGateway(originalSerialNumber, values) {
    return updateGateway(originalSerialNumber, values);
  }

  function onDeleteGateway(serialNumber) {
    return deleteGateway(serialNumber);
  }

  const gatewaysList = gateways.map((gateway) => ({
    id: gateway.serialNumber,
    name: gateway.readableName || gateway.serialNumber || gateway.ipv4,
    link: `/${gateway.serialNumber}`,
    linkText: 'Show gateway peripherals',
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
        key: 'ipv4',
        name: 'IPv4',
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
      <TitleWithButton title="Gateways" onButtonClick={showModal}>
        <FontAwesomeIcon icon={['fas', 'plus']} /> New Gateway
      </TitleWithButton>
      {!isReady ? (
        <Loader />
      ) : (
        <>
          <DataList
            items={gatewaysList}
            formFields={GATEWAY_FORM_FIELDS}
            onEdit={onUpdateGateway}
            onDelete={onDeleteGateway}
          />
          <Modal isShown={isAddGatewayFormShown} onClose={closeModal}>
            <FormCreator
              resetFlag={isAddGatewayFormShown}
              title="New Gateway"
              fields={GATEWAY_FORM_FIELDS}
              onSubmit={onCreateGateway}
              onSuccess={closeModal}
            />
          </Modal>
        </>
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
  createGateway,
  updateGateway,
  deleteGateway,
};

export default connectWithRouter(
    GatewaysPage,
    mapStateToProps,
    mapActionsToProps,
);
