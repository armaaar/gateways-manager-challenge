import {useState, useEffect} from 'react';

export default function useApi(state, fetch) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (state && Array.isArray(state) && state.length) {
      setIsReady(true);
    } else if (!isReady) {
      fetch().then(() => {
        setIsReady(true);
      });
    }
  }, [fetch, isReady, state]);

  return isReady;
}
