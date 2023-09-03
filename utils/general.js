/* eslint-disable no-useless-escape */
/* eslint-disable no-restricted-globals */

export const saveToStorage = (prop, val, action = 'replace') => {
  const storage = window.localStorage.getItem('portal-ccs');
  const storageObj = JSON.parse(storage);
  if (!val) {
    delete storageObj[prop];
    window.localStorage.setItem('portal-ccs', JSON.stringify(storageObj));
    return;
  }

  if (!window.localStorage.getItem('portal-ccs')) {
    window.localStorage.setItem('portal-ccs', JSON.stringify({ [prop]: val }));
    return;
  }

  const newValue = action === 'replace' ? { [prop]: val } : { [prop]: { ...storageObj[prop], ...val } };
  window.localStorage.setItem('portal-ccs', JSON.stringify({ ...storageObj, ...newValue }));
};

export const getFromStorage = prop => {
  const storage = window.localStorage.getItem('portal-ccs');

  if (storage) {
    return JSON.parse(storage)[prop];
  }
};

export const handleBodyScrollbar = () => {
  const hasScrollbar = window.innerWidth !== document.body.clientWidth;
  document.body.classList[hasScrollbar ? 'add' : 'remove']('has-scrollbar');
};
