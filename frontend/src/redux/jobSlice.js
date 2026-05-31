import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  initialState: {
    allAdminJobs: [],
    allAppliedJobs: [],
    allJobs: [],
    searchedQuery: "",
    searchJobByText: "",
    singleJob: null,
  },
  name: "job",
  reducers: {
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
