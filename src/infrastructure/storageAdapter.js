const memoryStore = new Map();

export function createBrowserStorage(namespace) {
  const canUseLocalStorage = () => {
    try {
      return typeof window !== 'undefined' && Boolean(window.localStorage);
    } catch {
      return false;
    }
  };

  const keyFor = (key) => `${namespace}:${key}`;

  return {
    get(key, fallbackValue) {
      const namespacedKey = keyFor(key);

      try {
        const rawValue = canUseLocalStorage()
          ? window.localStorage.getItem(namespacedKey)
          : memoryStore.get(namespacedKey);

        return rawValue ? JSON.parse(rawValue) : fallbackValue;
      } catch {
        return fallbackValue;
      }
    },
    set(key, value) {
      const namespacedKey = keyFor(key);
      const serializedValue = JSON.stringify(value);

      if (canUseLocalStorage()) {
        window.localStorage.setItem(namespacedKey, serializedValue);
        return;
      }

      memoryStore.set(namespacedKey, serializedValue);
    },
  };
}
