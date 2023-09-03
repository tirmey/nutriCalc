export const handleHydration = (st, action) => {
  if (action.payload.formulaSlice.formulas.length) {
    return  {
      ...st,
      formulaSlice: action.payload.formulaSlice,
    }
  }

  return st;
};
