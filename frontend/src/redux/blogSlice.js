import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    searchQuery: "",
    singleBlog: null, // Store for a single blog
  },
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
   
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSingleBlog: (state, action) => {
      state.singleBlog = action.payload;
    },
    resetSingleBlog: (state) => {
      state.singleBlog = null; // Clear the single blog
    },
  },
});

export const { setBlogs, setSearchQuery, setSingleBlog, resetSingleBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
