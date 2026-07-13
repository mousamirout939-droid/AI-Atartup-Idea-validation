import { useEffect, useState } from 'react';

/**
 * Debounces a fast-changing value (e.g. a search input) so consumers only
 * react after the user has paused typing for `delay` ms.
 */
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
