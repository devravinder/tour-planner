/* eslint @typescript-eslint/no-unsafe-assignment:0 */
declare global {
  interface Window {
    localStorage: WebStorage;
    sessionStorage: WebStorage;
    memoryStorage: WebStorage;
  }
}
const versions: { [key in StorageType]: string } = {
  localStorage: "1.0",
  sessionStorage: "1.0",
  memoryStorage: "1.0",
};

export const memoryStorage: MemoryStorage = {
  data: {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem(key: WebStorageKey, value: any) {
    this.data[key] = value;
  },
  getItem(key: WebStorageKey) {
    return this.data[key];
  },
  removeItem(key: WebStorageKey) {
    delete this.data[key];
  },
  clear() {
    this.data = {};
  },
  key(index: number) {
    return Object.keys(this.data)[index];
  },
  get length() {
    return Object.keys(this.data).length;
  },
};
window.memoryStorage = memoryStorage; // register on window

const handleVersionMisMatch = () => {
  let key: StorageType;
  for (key in versions) {
    if (window[key].getItem("vserion") !== versions[key]) {
      window[key].clear();
      window[key].setItem("vserion", versions[key]);
    }
  }
};
handleVersionMisMatch();

export const localStorage = window.localStorage;
export const sessionStorage = window.sessionStorage;

export const webStores = {
  memoryStorage,
  localStorage,
  sessionStorage,
};
export default webStores;
