import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    loading: false,
    singleJob: null,
    allAdminJobs: [],
    searchJobByText: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchJobByText:  (state, action) => {
      state.searchJobByText = action.payload;
    },
  },
});

export const { setAllJobs, setLoading, setSingleJob, setAllAdminJobs, setSearchJobByText} = jobSlice.actions;
export default jobSlice.reducer;
