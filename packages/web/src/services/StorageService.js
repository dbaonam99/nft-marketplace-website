export const allowedKeys = {
  THEME_MODE_KEY: "nft_theme_mode",
};

class StorageService {
  listeners = {};

  constructor() {
    Object.values(allowedKeys).forEach((key) => {
      //@ts-ignore
      this.listeners[key] = [];
    });

    this.runListenersFor = this.runListenersFor.bind(this);
    this._get = this._get.bind(this);
  }

  get mode() {
    const item = localStorage.getItem(allowedKeys.THEME_MODE_KEY);
    return item;
  }

  set mode(newMode) {
    if (typeof newMode === "undefined") {
      localStorage.removeItem(allowedKeys.THEME_MODE_KEY);
      return;
    }

    localStorage.setItem(allowedKeys.THEME_MODE_KEY, newMode);
    this.runListenersFor(allowedKeys.THEME_MODE_KEY, newMode);
  }

  //@ts-ignore
  runListenersFor(key, val) {
    //@ts-ignore
    this.listeners[key].forEach((fn) => {
      fn(val);
    });
  }
  //@ts-ignore
  registerListener(watchProp, fn, options) {
    if (!Object.values(allowedKeys).includes(watchProp)) return;
    //@ts-ignore
    if (this.listeners[watchProp].includes(fn)) return;
    //@ts-ignore
    this.listeners[watchProp].push(fn);

    if (options.run1st) {
      this.runListenersFor(watchProp, this._get(watchProp));
    }
  }
  //@ts-ignore
  removeListener(watchProp, fn) {
    if (!Object.values(allowedKeys).includes(watchProp)) return;
    //@ts-ignore
    const index = this.listeners[watchProp].indexOf(fn);
    if (index !== -1) {
      //@ts-ignore
      this.listeners[watchProp].splice(index, 1);
    }
  }
  //@ts-ignore
  _get(prop) {
    switch (prop) {
      case allowedKeys.THEME_MODE_KEY:
        return this.mode;
      default:
        return null;
    }
  }
}

export default new StorageService();
