import { createSlice } from '@reduxjs/toolkit'

const initialState = { value1: 0 }

const testSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value1++
    },
    decrement(state) {
      state.value1--
    },
    incrementByAmount(state, action) {
      state.value1 += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = testSlice.actions
export default testSlice.reducer;
