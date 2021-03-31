import axios from 'axios';
import {API_SOURCE} from '../utils/constants';
/*
* action types
*/
export const ADD_GATEWAYS = 'gateways:addGateways';

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

export function fetchGateways() {
  return (dispatch) => {
    return axios.get(API_SOURCE+'/gateways/')
        .then( (response) => {
          dispatch(addGateways(response.data));
        });
  };
}
