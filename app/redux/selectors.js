// selectors.js
export const selectFormData = (state, formNumber) => state.forms[formNumber];

// Esportazione di default (se necessaria)
const selectors = {
  selectFormData,
};

export default selectors;