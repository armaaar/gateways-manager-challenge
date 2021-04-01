import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {useParams, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Loader from '../components/Loader';
import DataList from '../components/DataList';
import DataListItem from '../components/DataListItem';
import Modal from '../components/Modal';
import FormCreator from '../components/FormCreator';
import TitleWithButton from '../components/TitleWithButton';

import useApi from '../hooks/use-api';
import connectWithRouter from '../utils/connect-with-router';
import createAutoSelector from '../utils/auto-selector';
import GATEWAY_FORM_FIELDS from '../formFields/gatewayFormFields';
import {
  fetchGateways,
  updateGateway,
  deleteGateway,
} from '../actions/gateways-actions';

function GatewayPage({
  gateways,
  fetchGateways,
  updateGateway,
  deleteGateway,
}) {
  const {gatewaySerialNumber} = useParams();
  const gateway = gateways.find((gw) => gw.serialNumber === gatewaySerialNumber);

  const gatewayInfo = gateway && {
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
  };

  const peripheralsInfo = gateway && gateway.peripherals.map((peripheral) => ({
    id: peripheral.UID,
    name: peripheral.UID || peripheral.vendor,
    info: [
      {
        key: 'UID',
        name: 'UID',
        value: peripheral.UID,
      },
      {
        key: 'vendor',
        name: 'Vendor',
        value: peripheral.vendor,
      },
      {
        key: 'dateCreated',
        name: 'Date Created',
        value: peripheral.dateCreated,
      },
      {
        key: 'status',
        name: 'Status',
        value: peripheral.status ? 'Online' : 'Offline',
      },
    ],
  }));

  const isReady = useApi(gateways, fetchGateways);
  const [isAddPeripheralFormShown, setisAddPeripheralFormShown] = useState(false);
  const history = useHistory();

  function showModal() {
    setisAddPeripheralFormShown(true);
  }

  function closeModal() {
    setisAddPeripheralFormShown(false);
  }

  function onUpdateGateway(originalSerialNumber, values) {
    const needsRedirect = originalSerialNumber !== values.serialNumber;
    return updateGateway(originalSerialNumber, values).then((response) => {
      if (!(response && response.errors) && needsRedirect) {
        history.push(`/${values.serialNumber}`);
      }
    });
  }

  function onDeleteGateway(serialNumber) {
    return deleteGateway(serialNumber).then((response) => {
      if (!(response && response.errors)) {
        history.push('/');
      }
    });
  }

  function onCreatePeripheral(_, values) {
    // return createGateway(values);
  }

  function onUpdatePeripheral(originalUID, values) {
    // return updateGateway(originalSerialNumber, values);
  }

  function onDeletePeripheral(UID) {
    // return deleteGateway(serialNumber);
  }

  return (
    <section>
      <TitleWithButton title="Gateway info"/>
      {!isReady ? (
        <Loader />
      ) : !gateway ? (
        <Redirect to="/" />
      ) : (
        <>
          <DataListItem
            item={gatewayInfo}
            formFields={GATEWAY_FORM_FIELDS}
            onEdit={onUpdateGateway}
            onDelete={onDeleteGateway}
          />
          <TitleWithButton title="Gateway peripherals" onButtonClick={showModal}>
            <FontAwesomeIcon icon={['fas', 'plus']} /> New Peripheral
          </TitleWithButton>
          <DataList
            items={peripheralsInfo}
            formFields={GATEWAY_FORM_FIELDS}
            onEdit={onUpdatePeripheral}
            onDelete={onDeletePeripheral}
          />
          <Modal isShown={isAddPeripheralFormShown} onClose={closeModal}>
            <FormCreator
              resetFlag={isAddPeripheralFormShown}
              title="New Peripheral"
              fields={GATEWAY_FORM_FIELDS}
              onSubmit={onCreatePeripheral}
              onSuccess={closeModal}
            />
          </Modal>
        </>
      )}
    </section>
  );
}

GatewayPage.propTypes = {
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

GatewayPage.defaultProps = {
  gateways: [],
};

const mapStateToProps = createAutoSelector(
    (state) => state.gateways,
    (gateways) => ({gateways}),
);

const mapActionsToProps = {
  fetchGateways,
  updateGateway,
  deleteGateway,
};

export default connectWithRouter(
    GatewayPage,
    mapStateToProps,
    mapActionsToProps,
);
