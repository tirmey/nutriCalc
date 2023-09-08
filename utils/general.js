/* eslint-disable no-useless-escape */
/* eslint-disable no-restricted-globals */
const STORAGE = process.env.NEXT_PUBLIC_LOCAL_ST;

export const saveToStorage = (prop, val, action = 'replace') => {
  const storage = window.localStorage.getItem(STORAGE);
  const storageObj = JSON.parse(storage);
  if (!val) {
    if (!storageObj) {
      return;
    }

    delete storageObj[prop];

    if (Object.keys(storageObj).length) {
      window.localStorage.setItem(STORAGE, JSON.stringify(storageObj));
    } else {
      window.localStorage.removeItem(STORAGE);
    }
    return;
  }

  if (!window.localStorage.getItem(STORAGE)) {
    window.localStorage.setItem(STORAGE, JSON.stringify({ [prop]: val }));
    return;
  }

  const newValue = action === 'replace' ? { [prop]: val } : { [prop]: { ...storageObj[prop], ...val } };
  window.localStorage.setItem(STORAGE, JSON.stringify({ ...storageObj, ...newValue }));
};

export const getFromStorage = prop => {
  const storage = window.localStorage.getItem(STORAGE);

  if (storage) {
    return JSON.parse(storage)[prop];
  }
};

export const handleBodyScrollbar = () => {
  const hasScrollbar = window.innerWidth !== document.body.clientWidth;
  document.body.classList[hasScrollbar ? 'add' : 'remove']('has-scrollbar');
};
