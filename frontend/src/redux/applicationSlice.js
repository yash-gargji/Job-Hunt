import { SelectTrigger } from "@radix-ui/react-select";
import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants: null,
        loading: false,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        setLoading: (state,action) => {
            state.loading = action.payload;
        },
    }
});
export const {setAllApplicants,setLoading} = applicationSlice.actions;
export default applicationSlice.reducer;