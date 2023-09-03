import { createSlice } from '@reduxjs/toolkit'

const initialState = { formulas: [] }

const formulaSlice = createSlice({
  name: 'formula',
  initialState,
  reducers: {
    getFormulas(state, action) {
      state.formulas = action.payload;
    },
  },
})

export const { getFormulas } = formulaSlice.actions
export default formulaSlice.reducer;
