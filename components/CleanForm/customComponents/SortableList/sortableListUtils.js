import { getPropToShow } from '../FilesManager/filesManagerUtils';

export const upHandler = (e, list, prop) => {
  const title = e.target.dataset.title;
  const isArray = Array.isArray(list);
  const itemsArr = isArray ? list : Object.entries(list);
  const orderedArr = [];

  for (let i = 0; i < itemsArr.length; i++) {
    const item = isArray ? itemsArr[i] : itemsArr[i][1];
    const propToShow = getPropToShow(item, prop);
    const itemTitle = propToShow || item;

    if (itemTitle === title) {
      orderedArr.splice(i - 1, 0, itemsArr[i]);
    } else {
      orderedArr.push(itemsArr[i]);
    }
  }

  return { items: orderedArr, isArray };
};

export const downHandler = (e, list, prop) => {
  const title = e.target.dataset.title;
  const orderedArr = [];
  const isArray = Array.isArray(list);
  const itemsArr = isArray ? list : Object.entries(list);
  let itemIndex;
  for (let i = itemsArr.length - 1; i >= 0; i--) {
    const item = isArray ? itemsArr[i] : itemsArr[i][1];
    const propToShow = getPropToShow(item, prop);
    const itemTitle = propToShow || item;

    if (itemTitle === title) {
      itemIndex = i;
      break;
    }
  }

  for (let i = 0; i < itemsArr.length; i++) {
    if (i === itemIndex) {
      orderedArr.push(itemsArr[i + 1]);
    } else if (i === itemIndex + 1) {
      orderedArr.push(itemsArr[i - 1]);
    } else {
      orderedArr.push(itemsArr[i]);
    }
  }

  return { items: orderedArr, isArray };
};

export const checkSorted = (st, oldItems, newItems, name, property) => {
  const newState = { ...st };

  const itemsArr = Array.isArray(newItems) ? newItems : Object.values(newItems);
  const newItemsArr = itemsArr.map(it => getPropToShow(it, property));

  let reordered;

  if (newState.reorderedLists && newState.reorderedLists[name]) {
    reordered = JSON.stringify(newState.reorderedLists[name].originalList) !== JSON.stringify(newItemsArr);
  } else {
    reordered = JSON.stringify(oldItems) !== JSON.stringify(newItemsArr);
  }

  if (reordered) {
    if (!newState.reorderedLists) {
      newState.reorderedLists = {};
    }

    if (newState.reorderedLists[name]?.originalList) {
      newState.reorderedLists[name].sorted = true;
    } else {
      newState.reorderedLists[name] = {
        sorted: true,
        originalList: oldItems,
      };
    }
  } else if (newState.reorderedLists && newState.reorderedLists[name]) {
    delete newState.reorderedLists[name].sorted;
  }

  return { ...newState, [name]: newItems };
};
