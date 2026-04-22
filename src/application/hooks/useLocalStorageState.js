import { useEffect, useMemo, useState } from 'react';
import { createBrowserStorage } from '../../infrastructure/storageAdapter';

export function useLocalStorageState(key, initialValue) {
  const storage = useMemo(() => createBrowserStorage('pujapath'), []);
  const [value, setValue] = useState(() => storage.get(key, initialValue));

  useEffect(() => {
    storage.set(key, value);
  }, [key, storage, value]);

  return [value, setValue];
}
