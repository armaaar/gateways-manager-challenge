import createCachedSelector from 're-reselect';

function keySelectorCombiner({inputSelectors = []} = {}) {
  const keySelectors = inputSelectors
      .map((entry) => entry.keySelector)
      .filter((keySelector) => typeof keySelector === 'function');

  // The actual keySelector
  return (...args) => {
    return keySelectors
        .map((keySelector) => keySelector(...args))
        .filter((value) => {
          const valueType = typeof value;
          return valueType === 'string' || valueType === 'number';
        })
        .join(':');
  };
}

export default function createAutoSelector(...args) {
  return createCachedSelector(...args)({
    keySelectorCreator: keySelectorCombiner,
  });
}
