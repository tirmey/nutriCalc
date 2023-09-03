import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import testSlice from './slices/testSlice';
import formulaSlice from './slices/formulaSlice';
import uiSlice from './slices/uiSlice';
import { handleHydration } from './reducersUtils/hydration';

const slices = combineReducers({
  testSlice,
  formulaSlice,
  uiSlice,
});

const masterReducer = (st, action) => {
  if (action.type === HYDRATE) {
    // in Hydration, we should bring to redux only the slices affected by fetch, to preserve the clientside state! So, write new cases as needed in handleHydration helper
    const nextState = handleHydration(st, action);
    return nextState;
  }

  return slices(st, action);
};

export const makeStore = () => configureStore({
  reducer: masterReducer,
});

export const reduxWrapper = createWrapper(makeStore);
