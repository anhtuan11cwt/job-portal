import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  initialState: {
    allAdminJobs: [],
    allAppliedJobs: [],
    allJobs: [],
    filters: { industry: "", location: "", salary: "" },
    searchJobByText: "",
    singleJob: null,
  },
  name: "job",
  reducers: {
    clearFilters: (state) => {
      state.filters = { industry: "", location: "", salary: "" };
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
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
  setFilter,
  clearFilters,
  setSearchJobByText,
  setAllAppliedJobs,
} = jobSlice.actions;
export default jobSlice.reducer;
