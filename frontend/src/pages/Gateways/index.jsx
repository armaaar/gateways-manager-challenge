import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Loader from '../../components/Loader';
import DataList from '../../components/DataList';
import Modal from '../../components/Modal';
import FormCreator from '../../components/FormCreator';
import Button from '../../components/Button';

import useApi from '../../hooks/use-api';
import connectWithRouter from '../../utils/connect-with-router';
import createAutoSelector from '../../utils/auto-selector';
import {fetchGateways, createGateway} from '../../actions/gateways-actions';

import styles from './styles.module.sass';

const GATEWAY_FORM_FIELDS = [
  {
    key: 'serialNumber',
    label: 'Serial Number',
    type: 'text',
    initValue: '',
    validator: (value) => {
      if (!value) return 'Serial Number must be provided';
      return null;
    },
  },
  {
    key: 'readableName',
    label: 'Readable Name',
    type: 'text',
    initValue: '',
  },
  {
    key: 'ipv4',
    label: 'IPv4',
    type: 'text',
    initValue: '',
    validator: (value) => {
      if (!value) return 'IPv4 must be provided';
      if (!(/^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/.test(value))) {
        return 'IPv4 is invalid';
      }
      return null;
    },
  },
];

function GatewaysPage({gateways, fetchGateways, createGateway}) {
  const isReady = useApi(gateways, fetchGateways);
  const [isAddGatewayFormShown, setIsAddGatewayFormShown] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  function onAddButtonClick() {
    setIsAddGatewayFormShown(true);
  }

  function onModalClose() {
    setIsAddGatewayFormShown(false);
    setApiErrors({});
  }

  function onCreateGateway(values) {
    createGateway(values).then((response) => {
      if (response && response.errors) {
        setApiErrors(response.errors);
      } else {
        onModalClose();
      }
    });
  }

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
      <div className={styles.header}>
        <h2>Gateways</h2>
        <Button onClick={onAddButtonClick}>
          <FontAwesomeIcon icon={['fas', 'plus']} /> New Gateway
        </Button>
      </div>
      {!isReady ? (
        <Loader />
      ) : (
        <DataList items={gatewaysList} />
      )}
      <Modal isShown={isAddGatewayFormShown} onClose={onModalClose}>
        <FormCreator
          resetFlag={isAddGatewayFormShown}
          title="New Gateway"
          fields={GATEWAY_FORM_FIELDS}
          fieldsErrors={apiErrors}
          onSubmit={onCreateGateway}
        />
      </Modal>
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
};

export default connectWithRouter(
    GatewaysPage,
    mapStateToProps,
    mapActionsToProps,
);
