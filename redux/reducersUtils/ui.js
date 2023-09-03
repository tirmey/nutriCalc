import cloneDeep from 'lodash.clonedeep';

export const modalsHandler = (modals, payload, cb) => {
  if (!payload) {
    return { activeModals: modals, isModalOpen: [] };
  }

  console.log('modals: >>>>>> ', modals);
  console.log('payload: >>>>>> ', payload);

  const { modalId, eraseContent, closeAll } = payload;
  const newModals = cloneDeep(modals);
  let openedModals = Object.keys(newModals);

  if (eraseContent && closeAll) {
    return { activeModals: {}, isModalOpen: [] };
  }

  const idArr = Object.keys(modals);
  const lastModalId = idArr[idArr.length - 1];

  const modalsToCloseAfterProcess = Object.entries(newModals).filter(it => it[1].closeAfterProcess && lastModalId !== it[0]).map(it => it[0]);

  if (modalsToCloseAfterProcess) {
    openedModals = openedModals.filter(it => it !== modalId && !modalsToCloseAfterProcess.includes(it));
  }

  if (modalId) {
    if (eraseContent) {
      delete newModals[modalId];
    }
    openedModals = openedModals.filter(it => it !== modalId);
  } else {
    const newModalId = `${(Math.random() * 10000).toFixed(0)}_${new Date().getTime()}`;
    newModals[newModalId] = { ...payload, modalId: newModalId };
    if (cb) {
      cb(newModalId);
    }
    openedModals.push(newModalId);
  }

  const noModals = !Object.keys(newModals).length;

  return { activeModals: noModals ? {} : newModals, isModalOpen: openedModals || [] };
};
