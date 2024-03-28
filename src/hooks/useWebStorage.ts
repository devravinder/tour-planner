import { useState } from "react";
import { webStores } from "state/webStorage";

export default function useWebStorage<ValueType>(
  key: WebStorageKey,
  defaultValue: ValueType,
  storageType?: StorageType,
): [ValueType, (newValue: ValueType) => void] {
  const webStorage = webStores[storageType || "localStorage"];

  const [value, setValue] = useState(() => {
    const storedValue = webStorage.getItem(key);
    return storedValue === null
      ? defaultValue
      : (JSON.parse(storedValue) as ValueType);
  });
  const setInStore = (newValue: ValueType) => {
    webStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setInStore];
}
