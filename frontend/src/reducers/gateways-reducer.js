import {ADD_GATEWAYS} from '../actions/gateways-actions';

function addGateways(state, payload) {
  const newGateways = [...state];
  payload.gateways.forEach((newGateway) => {
    const gatewayIndex = newGateways.findIndex((gateway) => gateway._id === newGateway._id);
    if (gatewayIndex === -1) {
      newGateways.push(newGateway);
    } else {
      newGateways[gatewayIndex] = newGateway;
    }
  });
  return newGateways;
}

export default function gatewaysReducer(state = [], {type, payload}) {
  switch (type) {
    case ADD_GATEWAYS: {
      return addGateways(state, payload);
    }
    default: {
      return state;
    }
  }
}
