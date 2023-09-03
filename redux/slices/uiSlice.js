import { createSlice, current, freeze } from '@reduxjs/toolkit'
import { modalsHandler } from '../reducersUtils/ui';

const initialState = {
  theme: 'light',
  isModalOpen: [],
  activeModals: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    isModalOpen(state, action) {
      state.isModalOpen =  action.payload || [];
    },
    setActiveModals(state, action) {
      const currentModals = current(state.activeModals);
      const newState = modalsHandler(currentModals, action.payload, action.cb);
      const { isModalOpen, activeModals } = newState;
      state.isModalOpen = isModalOpen;
      state.activeModals = activeModals;
    },
  },
})

export const { isModalOpen, setActiveModals, setTheme, showText } = uiSlice.actions
export default uiSlice.reducer;
