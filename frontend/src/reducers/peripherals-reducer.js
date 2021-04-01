import {
  UPSERT_PERIPHERALS,
  REMOVE_PERIPHERALS,
} from '../actions/peripherals-actions';

function upsertPeripheral(state, newPeripheral) {
  const newPeripherals = [...state];
  const peripheralIndex = newPeripherals.findIndex(
      (peripheral) => peripheral._id === newPeripheral._id,
  );
  if (peripheralIndex === -1) {
    newPeripherals.push(newPeripheral);
  } else {
    newPeripherals[peripheralIndex] = newPeripheral;
  }
  return newPeripherals;
}

function removePeripheral(state, UID) {
  return [...state.filter((peripheral) => peripheral.UID !== UID)];
}

export default function peripheralsReducer(state = [], {type, payload}) {
  switch (type) {
    case UPSERT_PERIPHERALS: {
      return upsertPeripheral(state, payload.peripheral);
    }
    case REMOVE_PERIPHERALS: {
      return removePeripheral(state, payload.UID);
    }
    default: {
      return state;
    }
  }
}
