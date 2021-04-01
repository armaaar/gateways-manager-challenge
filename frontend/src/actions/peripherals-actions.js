import axios from 'axios';
import {API_SOURCE} from '../utils/constants';
/*
* action types
*/
export const UPSERT_PERIPHERALS = 'peripherals:upsertPeripheral';
export const REMOVE_PERIPHERALS = 'peripherals:removePeripheral';

/*
* action creators
*/

export function upsertPeripheral(gatewaySerialNumber, newPeripheral) {
  return {
    type: UPSERT_PERIPHERALS,
    payload: {
      gatewaySerialNumber,
      peripheral: newPeripheral,
    },
  };
}

export function removePeripheral(gatewaySerialNumber, UID) {
  return {
    type: REMOVE_PERIPHERALS,
    payload: {
      gatewaySerialNumber,
      UID,
    },
  };
}

/*
* Async Actions
*/

export function createPerihperal(gatewaySerialNumber, {UID, vendor, status}) {
  return (dispatch) => {
    return axios.post(
        `${API_SOURCE}/gateways/${gatewaySerialNumber}/peripherals`,
        {
          UID,
          vendor,
          status,
        },
    ).then( (response) => {
      dispatch(upsertPeripheral(gatewaySerialNumber, response.data));
    }).catch((error) => {
      return error.response.data;
    });
  };
}

export function updatePerihperal(gatewaySerialNumber, originalUID, {UID, vendor, status}) {
  console.log('updatePerihperal', {
    UID,
    vendor,
    status,
  });
  return (dispatch) => {
    return axios.put(
        `${API_SOURCE}/gateways/${gatewaySerialNumber}/peripherals/${originalUID}`,
        {
          UID,
          vendor,
          status,
        },
    ).then( (response) => {
      console.log('upsertPeripheral', response.data);
      dispatch(upsertPeripheral(gatewaySerialNumber, response.data));
    }).catch((error) => {
      return error.response.data;
    });
  };
}

export function deletePerihperal(gatewaySerialNumber, UID) {
  return (dispatch) => {
    return axios.delete(`${API_SOURCE}/gateways/${gatewaySerialNumber}/peripherals/${UID}`)
        .then( () => {
          dispatch(removePeripheral(gatewaySerialNumber, UID));
        }).catch((error) => {
          return error.response.data;
        });
  };
}
