import {useState, useEffect} from 'react';

export default function useApi(state, fetch) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // fetch once if needed
    setIsReady(true);

    // fetch if no state exists
    if ((!state || (Array.isArray(state) && !state.length)) && !isReady) {
      fetch();
    }
  }, [fetch, isReady, state]);

  return isReady;
}
