/* eslint @typescript-eslint/no-explicit-any:0 */
type WebStorageKey = "vserion" | "user" | "isAuthenticated";
type StorageType = "localStorage" | "sessionStorage" | "memoryStorage";
type MemoryStorage = Storage & { data: Record<string, string | null> };
type WebStorage = Storage & {
  // for the autosuggestion of key
  setItem: (key: WebStorageKey, value: any) => void;
  getItem: (key: WebStorageKey) => string | null;
  removeItem: (key: WebStorageKey, value: any) => void;
};
