import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    sinegleComapny: null,
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.sinegleComapny = action.payload;
    },
    
  },
});
export const { setSingleCompany } = companySlice.actions;
export default companySlice.reducer;
