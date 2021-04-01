import {
  ADD_GATEWAYS,
  UPSERT_GATEWAY,
  REMOVE_GATEWAY,
} from '../actions/gateways-actions';
import peripheralsReducer from './peripherals-reducer';

function addGateways(state, gateways) {
  const newGateways = [...state];
  gateways.forEach((newGateway) => {
    const gatewayIndex = newGateways.findIndex((gateway) => gateway._id === newGateway._id);
    if (gatewayIndex === -1) {
      newGateways.push(newGateway);
    } else {
      newGateways[gatewayIndex] = newGateway;
    }
  });
  return newGateways;
}

function upsertGateway(state, newGateway) {
  const newGateways = [...state];
  const gatewayIndex = newGateways.findIndex((gateway) => gateway._id === newGateway._id);
  if (gatewayIndex === -1) {
    newGateways.push(newGateway);
  } else {
    newGateways[gatewayIndex] = newGateway;
  }
  return newGateways;
}

function removeGateway(state, serialNumber) {
  return [...state.filter((gateway) => gateway.serialNumber !== serialNumber)];
}

export default function gatewaysReducer(state = [], {type, payload}) {
  switch (type) {
    case ADD_GATEWAYS: {
      return addGateways(state, payload.gateways);
    }
    case UPSERT_GATEWAY: {
      return upsertGateway(state, payload.gateway);
    }
    case REMOVE_GATEWAY: {
      return removeGateway(state, payload.serialNumber);
    }
    default: {
      if (type.startsWith('peripherals:') && payload.gatewaySerialNumber) {
        const gateway = state.find(
            (gateway) => gateway.serialNumber === payload.gatewaySerialNumber,
        );

        if (!gateway) return state;

        return upsertGateway(state, {
          ...gateway,
          peripherals: peripheralsReducer(gateway.peripherals, {type, payload}),
        });
      }

      return state;
    }
  }
}
