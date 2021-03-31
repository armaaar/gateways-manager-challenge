import axios from 'axios';
import {API_SOURCE} from '../utils/constants';
/*
* action types
*/
export const ADD_GATEWAYS = 'gateways:addGateways';
export const UPSERT_GATEWAY = 'gateways:upsertGateway';

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
        API_SOURCE+'/gateways/',
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
