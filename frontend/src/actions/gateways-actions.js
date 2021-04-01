import axios from 'axios';
import {API_SOURCE} from '../utils/constants';
/*
* action types
*/
export const ADD_GATEWAYS = 'gateways:addGateways';
export const UPSERT_GATEWAY = 'gateways:upsertGateway';
export const REMOVE_GATEWAY = 'gateways:removeGateway';

/*
* action creators
*/
export function addGateways(newGateways) {
  return {
    type: ADD_GATEWAYS,
    payload: {
      gateways: newGateways,
    },
  };
}

export function upsertGateway(newGateway) {
  return {
    type: UPSERT_GATEWAY,
    payload: {
      gateway: newGateway,
    },
  };
}

export function removeGateway(serialNumber) {
  return {
    type: REMOVE_GATEWAY,
    payload: {
      serialNumber: serialNumber,
    },
  };
}

/*
* Async Actions
*/
export function fetchGateways() {
  return (dispatch) => {
    return axios.get(API_SOURCE+'/gateways/')
        .then( (response) => {
          dispatch(addGateways(response.data));
        });
  };
}

export function createGateway({serialNumber, readableName, ipv4}) {
  return (dispatch) => {
    return axios.post(
        `${API_SOURCE}/gateways/`,
        {
          serialNumber,
          readableName,
          ipv4,
        },
    ).then( (response) => {
      dispatch(upsertGateway(response.data));
    }).catch((error) => {
      return error.response.data;
    });
  };
}

export function updateGateway(originalSerialNumber, {serialNumber, readableName, ipv4}) {
  return (dispatch) => {
    return axios.put(
        `${API_SOURCE}/gateways/${originalSerialNumber}`,
        {
          serialNumber,
          readableName,
          ipv4,
        },
    ).then( (response) => {
      dispatch(upsertGateway(response.data));
    }).catch((error) => {
      return error.response.data;
    });
  };
}

export function deleteGateway(serialNumber) {
  return (dispatch) => {
    return axios.delete(`${API_SOURCE}/gateways/${serialNumber}`)
        .then( () => {
          dispatch(removeGateway(serialNumber));
        }).catch((error) => {
          return error.response.data;
        });
  };
}
