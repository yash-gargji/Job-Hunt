import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,          
    companies: [],
    searchCompanyByText: "",
    loading: false,
    
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;  
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchCompnayByText:(state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies, setLoading,setSearchCompnayByText} = companySlice.actions;
export default companySlice.reducer;
